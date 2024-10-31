'use server'
// HAS TO HAVE USE SERVER!!! OTHERWISE NOT WORKING
// because openai blocks openai api key if used on client side to prevent leaking
const apiRequest = require("./apiRequest");

const responseFormat = {
    "type": "json_schema",
    "json_schema": {
        "name": "user_groups",
        "strict": true,
        "schema": {
            "type": "object",
            "properties": {
                "group_size": {
                    "type": "number",
                    "description": "The size that each group should contain."
                },
                "groups": {
                    "type": "array",
                    "description": "List of groups created from users.",
                    "items": {
                        "type": "object",
                        "properties": {
                            "group_id": {
                                "type": "string",
                                "description": "Unique identifier for the group."
                            },
                            "members": {
                                "type": "array",
                                "description": "List of user IDs in the group.",
                                "items": {
                                    "type": "string"
                                }
                            }
                        },
                        "required": [
                            "group_id",
                            "members"
                        ],
                        "additionalProperties": false
                    }
                }
            },
            "required": [
                "group_size",
                "groups"
            ],
            "additionalProperties": false
        }
    }
};

export const matching = async (teamSize, questions, data) => {
    const context = `You need group the users into groups of size ${teamSize}. Given the user onboarding survey response in the following format and order: ${questions}, put users with similar background and skill level together.`;
    console.log('teamsize', teamSize);
    console.log('questions', questions);
    console.log('data', data);

    teamSize = Number(teamSize);
    if (isNaN(teamSize) || teamSize <= 0) {
        throw new Error('Team size must be a valid positive number');
    }
    if (!data || data.length === 0) {
        throw new Error('There are no members to be matched.');
    }
    return await apiRequest({context, responseFormat, data});
}