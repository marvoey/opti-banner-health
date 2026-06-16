POST /structured-content/contents/{content_id}/versions/{version_id}/previews/{preview_id}/complete

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.developers.optimizely.com/llms.txt
> Use this file to discover all available pages before exploring further.

# POST /structured-content/contents/{content_id}/versions/{version_id}/previews/{preview_id}/complete

<span style="background-color:#e95f6a;padding:5px;border-radius:5px">Experimental</span> Complete content preview. 

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
    "/structured-content/contents/{content_id}/versions/{version_id}/previews/{preview_id}/complete": {
      "post": {
        "operationId": "completeSCContentPreview",
        "tags": [
          "Structured Contents"
        ],
        "summary": "POST /structured-content/contents/{content_id}/versions/{version_id}/previews/{preview_id}/complete",
        "description": "<span style=\"background-color:#e95f6a;padding:5px;border-radius:5px\">Experimental</span> Complete content preview. ",
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
                "$ref": "#/components/schemas/SCContentPreviewCompleteRequest"
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
      "KeyedPreviewCompletedModel": {
        "required": [
          "completed"
        ],
        "type": "object",
        "properties": {
          "completed": {
            "maxLength": 65536,
            "minLength": 1,
            "type": "string",
            "format": "uri",
            "description": "URL for completed preview."
          },
          "name": {
            "type": "string",
            "default": "",
            "description": "Human readable preview name to distinguish between generated preview outcomes."
          },
          "orderIndex": {
            "type": "number",
            "default": 0,
            "description": "Priority of a preview. For multiple previews, this will be used to sort the previews."
          },
          "mimeType": {
            "type": "string",
            "default": "text/html",
            "description": "If not specified, the `mimeType` will be inferred from the `Content-Type` header from the `completed` URL.\n If the `mimeType` is not specified and there is no `Content-Type` header, this will default to `text/html`."
          },
          "locale": {
            "type": "string",
            "default": "en_US",
            "description": "If not specified, the `locale` will be infered from the `Content-Language` header from the `completed` URL.\n In case of multiple locales, only the first one will be considered and it will be converted to snake case.\n For example, if the `Content-Language` header from the `completed` URL returns `en-US, de, bn`, it will be inferred as `en_US`.\n If the `locale` is not specified and there is no `Content-Language` header, this will default to `en_US`."
          }
        }
      },
      "KeyedPreviewErrorModel": {
        "required": [
          "error"
        ],
        "type": "object",
        "properties": {
          "error": {
            "maxLength": 65536,
            "minLength": 1,
            "type": "string",
            "format": "uri",
            "description": "URL for error preview."
          },
          "name": {
            "type": "string",
            "default": "",
            "description": "Human readable preview name to distinguish between generated preview outcomes."
          },
          "orderIndex": {
            "type": "number",
            "default": 0,
            "description": "Priority of a preview. For multiple previews, this will be used to sort the previews."
          },
          "mimeType": {
            "type": "string",
            "default": "text/html",
            "description": "If not specified, the `mimeType` will be inferred from the `Content-Type` header from the `error` URL.\n If the `mimeType` is not specified and there is no `Content-Type` header, this will default to `text/html`."
          },
          "locale": {
            "type": "string",
            "default": "en_US",
            "description": "If not specified, the `locale` will be infered from the `Content-Language` header from the `error` URL.\n In case of multiple locales, only the first one will be considered and it will be converted to snake case.\n For example, if the `Content-Language` header from the `completed` URL returns `en-US, de, bn`, it will be inferred as `en_US`.\n If the `locale` is not specified and there is no `Content-Language` header, this will default to `en_US`."
          }
        }
      },
      "SCContentPreviewCompleteRequest": {
        "required": [
          "keyed_previews"
        ],
        "type": "object",
        "properties": {
          "keyed_previews": {
            "type": "object",
            "additionalProperties": {
              "anyOf": [
                {
                  "maxLength": 65536,
                  "minLength": 1,
                  "type": "string",
                  "format": "uri"
                },
                {
                  "$ref": "#/components/schemas/KeyedPreviewCompletedModel"
                },
                {
                  "$ref": "#/components/schemas/KeyedPreviewErrorModel"
                }
              ]
            }
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

contentMarketingPlatform.completeSCContentPreview({content_id: 'content_id', version_id: 'version_id', preview_id: 'preview_id'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
```