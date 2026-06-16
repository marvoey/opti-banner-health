> ## Documentation Index
> Fetch the complete documentation index at: https://docs.developers.optimizely.com/llms.txt
> Use this file to discover all available pages before exploring further.

# POST /structured-content/contents/{content_id}/versions/{version_id}/previews/{preview_id}/acknowledge

<span style="background-color:#e95f6a;padding:5px;border-radius:5px">Experimental</span> Acknowledge content preview. Content preview can be acknowledged only once. So make sure you are acknowledging only the content previews targeted for your integration. Otherwise it will stall acknowledgment from other integrations.

# OpenAPI definition

```json
{
  "openapi": "3.0.0",
  "info": {
    "version": "V3",
    "title": "Optimizely CMP Open API Documentation"
  },
  "servers": [
    {
      "url": "https://api.cmp.optimizely.com/v3",
      "description": "v3 version of Optimizely CMP Open API"
    }
  ],
  "security": [
    {
      "OAuth2": [
        "openid",
        "profile",
        "offline_access"
      ]
    }
  ],
  "tags": [
    {
      "name": "Structured Contents"
    }
  ],
  "paths": {
    "/structured-content/contents/{content_id}/versions/{version_id}/previews/{preview_id}/acknowledge": {
      "post": {
        "operationId": "acknowledgeSCContentPreview",
        "tags": [
          "Structured Contents"
        ],
        "summary": "POST /structured-content/contents/{content_id}/versions/{version_id}/previews/{preview_id}/acknowledge",
        "description": "<span style=\"background-color:#e95f6a;padding:5px;border-radius:5px\">Experimental</span> Acknowledge content preview. Content preview can be acknowledged only once. So make sure you are acknowledging only the content previews targeted for your integration. Otherwise it will stall acknowledgment from other integrations.",
        "parameters": [
          {
            "required": true,
            "schema": {
              "type": "string",
              "description": "Unique identifier of the content"
            },
            "name": "content_id",
            "in": "path"
          },
          {
            "required": true,
            "schema": {
              "type": "string",
              "description": "Unique identifier of the content version"
            },
            "name": "version_id",
            "in": "path"
          },
          {
            "required": true,
            "schema": {
              "type": "string",
              "description": "Unique identifier of the content version preview"
            },
            "name": "preview_id",
            "in": "path"
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SCContentPreviewAcknowledgeRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "OAuth2": {
        "type": "oauth2",
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "https://accounts.cmp.optimizely.com/o/oauth2/v1/auth",
            "tokenUrl": "https://accounts.cmp.optimizely.com/o/oauth2/v1/token",
            "scopes": {
              "openid": "Grants the ability to receive a unique identifier for the user.",
              "profile": "Grants access to user profile information.",
              "offline_access": "Grants the ability to refresh access_token using the refresh token even when user is not present (not logged in)."
            }
          },
          "clientCredentials": {
            "tokenUrl": "https://accounts.cmp.optimizely.com/o/oauth2/v1/token",
            "scopes": {}
          }
        }
      }
    },
    "schemas": {
      "ValidationError": {
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "type": "object",
        "properties": {
          "loc": {
            "type": "array",
            "description": "Locations where the error occurred",
            "items": {
              "type": "string"
            }
          },
          "msg": {
            "type": "string",
            "description": "Message describing the error"
          },
          "type": {
            "title": "Error Type",
            "type": "string",
            "description": "Type of the error"
          }
        }
      },
      "HTTPValidationError": {
        "type": "object",
        "properties": {
          "detail": {
            "type": "array",
            "description": "Details of the error",
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            }
          }
        }
      },
      "SCContentPreviewAcknowledgeRequest": {
        "required": [
          "acknowledged_by",
          "content_hash"
        ],
        "type": "object",
        "properties": {
          "acknowledged_by": {
            "type": "string",
            "description": "Unique identifier of the user who acknowledged the preview request"
          },
          "content_hash": {
            "type": "string",
            "description": "Content hash of the preview request"
          }
        }
      }
    }
  },
  "x-tagGroups": [
    {
      "name": "API",
      "tags": [
        "Uploader",
        "Library",
        "Labels",
        "Brand Compliance",
        "Tasks",
        "Task Step",
        "Campaigns",
        "Publishing",
        "Templates",
        "Users",
        "Work Requests",
        "Structured Contents",
        "Assets",
        "Milestones",
        "Teams",
        "Settings",
        "Workflows",
        "Fields",
        "Events"
      ]
    }
  ]
}
```

Example node.js
```
import contentMarketingPlatform from '@api/content-marketing-platform';

contentMarketingPlatform.acknowledgeSCContentPreview({content_id: 'content_id', version_id: 'version_id', preview_id: 'preview_id'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
s```