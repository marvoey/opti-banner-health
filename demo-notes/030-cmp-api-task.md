> ## Documentation Index
> Fetch the complete documentation index at: https://docs.developers.optimizely.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Task

## task\_metadata\_modified

Any of the following task properties were modified:

* Title
* Campaign
* Start at
* Due at
* Is completed
* Is archived
* Fields (Only label type field)

### Payload

| Key                        | Type   | Description                                              |
| -------------------------- | ------ | -------------------------------------------------------- |
| event\_name                | string | Name of the event. The value is `task_metadata_modifed`. |
| data                       | object | Data of the event.                                       |
| data\[task]                | object | Data of the removed task.                                |
| data\[task]\[id]           | string | Unique identifier of the task.                           |
| data\[task]\[links]        | object | Links related to the task.                               |
| data\[task]\[links]\[self] | string | URL to fetch task through the CMP Open API.              |

### Example

```json
{
  "event_name": "task_metadata_modified",
  "data": {
    "task": {
      "id": "870825113a12950a7eeeb64a64236dff",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/870825113a12950a7eeeb64a64236dff"
      }
    }
  }
}
```

## task\_added

A task was created.

### Payload

| Key                        | Type   | Description                                     |
| -------------------------- | ------ | ----------------------------------------------- |
| event\_name                | string | Name of the event. The value is `task_added`.   |
| data                       | object | Data of the event.                              |
| data\[task]                | object | Data of the added task.                         |
| data\[task]\[id]           | string | Unique identifier of the task.                  |
| data\[task]\[links]        | object | Links related to the task.                      |
| data\[task]\[links]\[self] | string | URL to fetch the task through the CMP Open API. |

### Example

```json
{
  "event_name": "task_added",
  "data": {
    "task": {
      "id": "870825113a12950a7eeeb64a64236dff",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf",
      }
    }
  }
}
```

## task\_removed

A task was removed.

### Payload

| Key              | Type   | Description                                     |
| ---------------- | ------ | ----------------------------------------------- |
| event\_name      | string | Name of the event. The value is `task_removed`. |
| data             | object | Data of the event.                              |
| data\[task]      | object | Data of the removed task.                       |
| data\[task]\[id] | string | Unique identifier of the task.                  |

### Example

```json
{
  "event_name": "task_removed",
  "data": {
    "task": {
      "id": "870825113a12950a7eeeb64a64236dff"
    }
  }
}
```

## task\_brief\_added

A brief was added to a task.

### Payload

| Key                         | Type   | Description                                           |
| --------------------------- | ------ | ----------------------------------------------------- |
| event\_name                 | string | Name of the event. The value is `task_brief_added`.   |
| data                        | object | Data of the event.                                    |
| data\[task]                 | object | Data of the task associated with the brief.           |
| data\[task]\[id]            | string | Unique identifier of the task.                        |
| data\[task]\[links]         | object | Links related to the task.                            |
| data\[task]\[links]\[self]  | string | URL to fetch the task through the CMP Open API.       |
| data\[task]\[links]\[brief] | string | URL to fetch the task brief through the CMP Open API. |

### Example

```json
{
  "event_name": "task_brief_added",
  "data": {
    "task": {
      "id": "3e34f1639c1046d49f51f5ab8cbb3fdf",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf",
        "brief": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/brief"
      }
    }
  }
}
```

## task\_brief\_removed

A brief was removed from a task.

### Payload

| Key                        | Type   | Description                                           |
| -------------------------- | ------ | ----------------------------------------------------- |
| event\_name                | string | Name of the event. The value is `task_brief_removed`. |
| data                       | object | Data of the event.                                    |
| data\[task]                | object | Data of the task associated with the brief.           |
| data\[task]\[id]           | string | Unique identifier of the task.                        |
| data\[task]\[links]        | object | Links related to the task.                            |
| data\[task]\[links]\[self] | string | URL to fetch the task through the CMP Open API.       |

### Example

```json
{
  "event_name": "task_brief_removed",
  "data": {
    "task": {
      "id": "3e34f1639c1046d49f51f5ab8cbb3fdf",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf"
      }
    }
  }
}
```

## task\_brief\_modified

A brief was modified for a task.

### Payload

| Key                         | Type   | Description                                            |
| --------------------------- | ------ | ------------------------------------------------------ |
| event\_name                 | string | Name of the event. The value is `task_brief_modified`. |
| data                        | object | Data of the event.                                     |
| data\[task]                 | object | Data of the task associated with the brief.            |
| data\[task]\[id]            | string | Unique identifier of the task.                         |
| data\[task]\[links]         | object | Links related to the task.                             |
| data\[task]\[links]\[self]  | string | URL to fetch the task through the CMP Open API.        |
| data\[task]\[links]\[brief] | string | URL to fetch the task brief through the CMP Open API.  |

### Example

```json
{
  "event_name": "task_brief_modified",
  "data": {
    "task": {
      "id": "3e34f1639c1046d49f51f5ab8cbb3fdf",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf",
        "brief": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/brief"
      }
    }
  }
}
```

## task\_asset\_added

A task's asset (`article`, `image`, `video` or `raw file`) was added.

### Payload

| Key                          | Type   | Description                                                                 |
| ---------------------------- | ------ | --------------------------------------------------------------------------- |
| event\_name                  | string | Name of the event. The value is `task_asset_added`.                         |
| data                         | object | Data of the event.                                                          |
| data\[task]                  | object | Data of the task associated with the deleted asset.                         |
| data\[task]\[id]             | string | Unique identifier of the task.                                              |
| data\[task]\[links]          | object | Links related to the task.                                                  |
| data\[task]\[links]\[self]   | string | URL to fetch the task through the CMP Open API.                             |
| data\[task]\[links]\[assets] | string | URL to fetch the assets of the task through the CMP Open API.               |
| data\[asset]                 | object | Data of the asset associated with the event.                                |
| data\[asset]\[id]            | string | Unique identifier of the asset.                                             |
| data\[asset]\[type]          | string | Type of the asset. Value can be `article`, `image`, `video`, or `raw_file`. |
| data\[asset]\[links]         | object | Links related to the asset.                                                 |
| data\[asset]\[links]\[self]  | string | URL to fetch the asset through the CMP Open API.                            |
| data\[asset]\[links]\[task]  | string | URL to fetch the task of the asset through the CMP Open API.                |

### Example

```json
{
  "event_name": "task_asset_added",
  "data": {
    "task": {
      "id": "5f6a0312a5963d0591015e3e",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e",
        "assets": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/assets"
      }
    },
    "asset": {
      "id": "870825113a12950a7eeeb64a64236d49",
      "type": "image",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/images/870825113a12950a7eeeb64a64236d49",
        "task": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e"
      }
    }
  }
}
```

## task\_asset\_removed

A task's asset (`article`, `image`, `video` or `raw file`) was removed.

### Payload

| Key                          | Type   | Description                                                                 |
| ---------------------------- | ------ | --------------------------------------------------------------------------- |
| event\_name                  | string | Name of the event. The value is `task_asset_removed`.                       |
| data                         | object | Data of the event.                                                          |
| data\[task]                  | object | Data of the task associated with the deleted asset.                         |
| data\[task]\[id]             | string | Unique identifier of the task.                                              |
| data\[task]\[links]          | object | Links related to the task.                                                  |
| data\[task]\[links]\[self]   | string | URL to fetch the task through the CMP Open API.                             |
| data\[task]\[links]\[assets] | string | URL to fetch the assets of the task through the CMP Open API.               |
| data\[asset]                 | object | Data of the asset associated with the event.                                |
| data\[asset]\[id]            | string | Unique identifier of the asset.                                             |
| data\[asset]\[type]          | string | Type of the asset. Value can be `article`, `image`, `video`, or `raw_file`. |

### Example

```json
{
  "event_name": "task_asset_removed",
  "data": {
    "task": {
      "id": "5f6a0312a5963d0591015e3e",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e",
        "assets": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/assets"
      }
    },
    "asset": {
      "id": "870825113a12950a7eeeb64a64236d49",
      "type": "image"
    }
  }
}
```

## task\_asset\_modified

A task's asset (`article`, `image`, `video` or `raw file`) was modified. This event is triggered by the modification of the task asset's title, labels and versions (of `image`, `video`, or `raw file`).

### Payload

| Key                          | Type   | Description                                                                 |
| ---------------------------- | ------ | --------------------------------------------------------------------------- |
| event\_name                  | string | Name of the event. The value is `task_asset_modified`.                      |
| data                         | object | Data of the event.                                                          |
| data\[task]                  | object | Data of the task associated with the modified asset.                        |
| data\[task]\[id]             | string | Unique identifier of the task.                                              |
| data\[task]\[links]          | object | Links related to the task.                                                  |
| data\[task]\[links]\[self]   | string | URL to fetch the task through the CMP Open API.                             |
| data\[task]\[links]\[assets] | string | URL to fetch the assets of the task through the CMP Open API.               |
| data\[asset]                 | object | Data of the asset associated with the event.                                |
| data\[asset]\[id]            | string | Unique identifier of the asset.                                             |
| data\[asset]\[type]          | string | Type of the asset. Value can be `article`, `image`, `video`, or `raw_file`. |
| data\[asset]\[links]         | object | Links related to the asset.                                                 |
| data\[asset]\[links]\[self]  | string | URL to fetch the asset through the CMP Open API.                            |
| data\[asset]\[links]\[task]  | string | URL to fetch the task of the asset through the CMP Open API.                |
| data\[attributes\_changed]   | array  | List of attributes that trigger the webhook.                                |

### Example

```json
{
  "event_name": "task_asset_modified",
  "data": {
    "task": {
      "id": "5f6a0312a5963d0591015e3e",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e",
        "assets": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/assets"
      }
    },
    "asset": {
      "id": "870825113a12950a7eeeb64a64236d49",
      "type": "image",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/images/870825113a12950a7eeeb64a64236d49",
        "task": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e"
      }
    },
    "attributes_changed": ["title", "description", "expires_at"]
  }
}
```

## task\_asset\_draft\_added

A draft was added to a task's asset (`image`, `video` or `raw file`).

### Payload

| Key                          | Type   | Description                                                      |
| ---------------------------- | ------ | ---------------------------------------------------------------- |
| event\_name                  | string | Name of the event. The value is `task_asset_draft_added`.        |
| data                         | object | Data of the event.                                               |
| data\[task]                  | object | Data of the task associated with the updated asset.              |
| data\[task]\[id]             | string | Unique identifier of the task.                                   |
| data\[task]\[links]          | object | Links related to the task.                                       |
| data\[task]\[links]\[self]   | string | URL to fetch the task through the CMP Open API.                  |
| data\[task]\[links]\[assets] | string | URL to fetch the assets of the task through the CMP Open API.    |
| data\[asset]                 | object | Data of the asset for which a new draft was added.               |
| data\[asset]\[id]            | string | Unique identifier of the asset.                                  |
| data\[asset]\[type]          | string | Type of the asset. Value can be `image`, `video`, or `raw_file`. |
| data\[asset]\[links]         | object | Links related to the asset.                                      |
| data\[asset]\[links]\[self]  | string | URL to fetch the asset through the CMP Open API.                 |
| data\[asset]\[links]\[task]  | string | URL to fetch the task of the asset through the CMP Open API.     |

### Example

```json
{
  "event_name": "task_asset_draft_added",
  "data": {
    "task": {
      "id": "3e34f1639c1046d49f51f5ab8cbb3fdf",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf",
        "assets": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/assets"
      }
    },
    "asset": {
      "id": "4d4ef1639c1046d49f51f5ab8cbb3fdf",
      "type": "image",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/images/4d4ef1639c1046d49f51f5ab8cbb3fdf",
        "task": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf"
      }
    }
  }
}
```

## task\_asset\_draft\_removed

A draft was removed from a task's asset (`image`, `video` or `raw file`).

### Payload

| Key                          | Type   | Description                                                      |
| ---------------------------- | ------ | ---------------------------------------------------------------- |
| event\_name                  | string | Name of the event. The value is `task_asset_draft_removed`.      |
| data                         | object | Data of the event.                                               |
| data\[task]                  | object | Data of the task associated with the updated asset.              |
| data\[task]\[id]             | string | Unique identifier of the task.                                   |
| data\[task]\[links]          | object | Links related to the task.                                       |
| data\[task]\[links]\[self]   | string | URL to fetch the task through the CMP Open API.                  |
| data\[task]\[links]\[assets] | string | URL to fetch the assets of the task through the CMP Open API.    |
| data\[asset]                 | object | Data of the asset for which a new draft was added.               |
| data\[asset]\[id]            | string | Unique identifier of the asset.                                  |
| data\[asset]\[type]          | string | Type of the asset. Value can be `image`, `video`, or `raw_file`. |
| data\[asset]\[links]         | object | Links related to the asset.                                      |
| data\[asset]\[links]\[self]  | string | URL to fetch the asset through the CMP Open API.                 |
| data\[asset]\[links]\[task]  | string | URL to fetch the task of the asset through the CMP Open API.     |

### Example

```json
{
  "event_name": "task_asset_draft_removed",
  "data": {
    "task": {
      "id": "3e34f1639c1046d49f51f5ab8cbb3fdf",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf",
        "assets": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/assets"
      }
    },
    "asset": {
      "id": "4d43f1639c1046d49f51f5ab8cbb3fdf",
      "type": "image",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/images/4d43f1639c1046d49f51f5ab8cbb3fdf",
        "task": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf"
      }
    }
  }
}
```

## task\_custom\_field\_modified

Values were modified for a task's fields (except label type).

### Payload

| Key                                                       | Type   | Description                                                                       |
| --------------------------------------------------------- | ------ | --------------------------------------------------------------------------------- |
| event\_name                                               | string | Name of the event. The value is `task_custom_field_modified`.                     |
| data                                                      | object | Data of the event.                                                                |
| data\[modified\_custom\_fields]                           | array  | Array of custom fields which were modified.                                       |
| data\[modified\_custom\_fields]\[\<index>]\[id]           | string | Unique identifier of the custom field.                                            |
| data\[modified\_custom\_fields]\[\<index>]\[links]        | string | Links related to the custom field.                                                |
| data\[modified\_custom\_fields]\[\<index>]\[links]\[self] | string | URL to fetch the custom field through the CMP Open API.                           |
| data\[task]                                               | object | Data of the task associated with the custom fields.                               |
| data\[task]\[id]                                          | string | Unique identifier of the task.                                                    |
| data\[task]\[links]                                       | object | Links related to the task.                                                        |
| data\[task]\[links]\[self]                                | string | URL to fetch the task through the CMP Open API.                                   |
| data\[task]\[links]\[assets]                              | string | URL to fetch the assets of the task through the CMP Open API.                     |
| data\[task]\[links]\[custom\_fields]                      | string | URL to fetch the custom fields associated with the task through the CMP Open API. |

### Example

```json
{
  "event_name": "task_custom_field_modified",
  "data": {
    "modified_custom_fields": [
      {
        "id": "45aafc5f9eec1cde2028d3245435c2",
        "links": {
          "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/custom-fields/45aafc5f9eec1cde2028d3245435c2"
        }
      },
      {
        "id": "45aafc5f9eec1cde2028d3245435c3",
        "links": {
          "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/custom-fields/45aafc5f9eec1cde2028d3245435c3"
        }
      },
      {
        "id": "45aafc5f9eec1cde2028d3245435c4",
        "links": {
          "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/custom-fields/45aafc5f9eec1cde2028d3245435c4"
        }
      }
    ],
    "task": {
      "id": "3e34f1639c1046d49f51f5ab8cbb3fdf",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf",
        "assets": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/assets",
        "custom_fields": "https://api.cmp.optimizely.com/v3/tasks/3e34f1639c1046d49f51f5ab8cbb3fdf/custom-fields"
      }
    }
  }
}
```

## content\_preview\_requested

A structured content preview was requested.

### Payload

| Key                                  | Type                                                                                                       | Description                                                  |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| event\_name                          | string                                                                                                     | Name of the event. The value is `content_preview_requested`. |
| data                                 | object                                                                                                     | Data of the event.                                           |
| data\[assets]                        | object                                                                                                     | Data of the assets associated with the event.                |
| data\[assets]\[structured\_contents] | array of [ContentPreviewStructuredContentModel](../reference/schemas#contentpreviewstructuredcontentmodel) | Array of structured contents.                                |
| data\[organization]                  | object                                                                                                     | Organization from which the preview request was fired.       |
| data\[organization]\[id]             | string                                                                                                     | Unique identifier of organization.                           |
| data\[task]                          | object                                                                                                     | Task assoicated with the assets.                             |
| data\[task]\[id]                     | string                                                                                                     | Unique identifier of the task.                               |
| data\[task]\[links]                  | object                                                                                                     | Links related to the task.                                   |
| data\[task]\[links]\[self]           | string                                                                                                     | URL to fetch the task through the CMP Open API.              |
| data\[links]                         | object                                                                                                     | Links related to the event.                                  |
| data\[links]\[acknowledge]           | string                                                                                                     | URL to acknowledge the preview through the CMP Open API.     |
| data\[links]\[complete]              | string                                                                                                     | URL to complete the preview through the CMP Open API.        |

### Example

```json
{
  "event_name": "content_preview_requested",
  "data": {
    "assets": {
      "structured_contents": [<structured_contents>]
    },
    "organization": {
      "id": "5d75447b7f1c1c000957d362"
    },
    "task": {
      "id": "667bdc43da4b2e045f23f0db",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/667bdc43da4b2e045f23f0db"
      }
    },
    "links": {
      "acknowledge": "https://api.cmp.optimizely.com/v3/structured-content/contents/1e7d1ebe28fd4378a0aa4cc300bc039e/versions/e790f3ec824544ea99d01c6f54c1d3c1/previews/b07bfc4c3d694e3d89982c9fc1698777/acknowledge",
      "complete": "https://api.cmp.optimizely.com/v3/structured-content/contents/1e7d1ebe28fd4378a0aa4cc300bc039e/versions/e790f3ec824544ea99d01c6f54c1d3c1/previews/b07bfc4c3d694e3d89982c9fc1698777/complete"
    }
  }
}
```

## workflow\_sub\_step\_updated

A workflow substep of a task has been updated. This webhook is fired when a substep has been started, completed, skipped or modified by changing the assignee or the due date.

### Payload

| Key                             | Type   | Description                                                                                            |
| ------------------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| event\_name                     | string | Name of the event. The value is `workflow_sub_step_updated`.                                           |
| data                            | object | Data of the event.                                                                                     |
| data\[status]                   | string | Change of the substep that triggered the webhook. Enum: `started`, `completed`, `skipped`,  `modified` |
| data\[task]                     | object | Data of the task associated with the substep.                                                          |
| data\[task]\[id]                | string | Unique identifier of the task.                                                                         |
| data\[task]\[links]             | object | Links related to the task.                                                                             |
| data\[task]\[links]\[self]      | string | URL to fetch the task through the CMP Open API.                                                        |
| data\[step]                     | object | Data of the step associated with the substep.                                                          |
| data\[step]\[id]                | string | Unique identifier of the step.                                                                         |
| data\[sub\_step]                | object | Data of the substep.                                                                                   |
| data\[sub\_step]\[id]           | string | Unique identifier of the substep.                                                                      |
| data\[sub\_step]\[links]        | object | Links related to the substep.                                                                          |
| data\[sub\_step]\[links]\[self] | string | URL to fetch the substep through the CMP Open API.                                                     |

### Example

```json
{
  "event_name": "workflow_sub_step_updated",
  "data": {
    "status": "started",
    "task": {
      "id": "5f6a0312a5963d0591015e3e",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e",
      }
    },
    "step": {
      "id": "5f68911d83eeb10591933b49",
    },
    "sub_step": {
      "id": "5f68911d83eeb10591933b4a",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a",
      }
    },
  }
}
```

## workflow\_sub\_step\_comment\_added

A top-level comment was added to a workflow substep of a task.

### Payload

| Key                                 | Type   | Description                                                                     |
| ----------------------------------- | ------ | ------------------------------------------------------------------------------- |
| event\_name                         | string | Name of the event. The value is `workflow_sub_step_comment_added`.              |
| data                                | object | Data of the event.                                                              |
| data\[task]                         | object | Data of the task associated with the substep.                                   |
| data\[task]\[id]                    | string | Unique identifier of the task.                                                  |
| data\[task]\[links]                 | object | Links related to the task.                                                      |
| data\[task]\[links]\[self]          | string | URL to fetch the task through the CMP Open API.                                 |
| data\[step]                         | object | Data of the step associated with the substep.                                   |
| data\[step]\[id]                    | string | Unique identifier of the step.                                                  |
| data\[sub\_step]                    | object | Data of the substep.                                                            |
| data\[sub\_step]\[id]               | string | Unique identifier of the substep.                                               |
| data\[sub\_step]\[links]            | object | Links related to the substep.                                                   |
| data\[sub\_step]\[links]\[self]     | string | URL to fetch the substep through the CMP Open API.                              |
| data\[sub\_step]\[links]\[comments] | string | URL to fetch the comments associated with the substep through the CMP Open API. |
| data\[comment]                      | object | Data of the comment.                                                            |
| data\[comment]\[id]                 | string | Unique identifier of the comment.                                               |
| data\[comment]\[links]              | object | Links related to the comment.                                                   |
| data\[comment]\[links]\[self]       | string | URL to fetch the comment through the CMP Open API.                              |

### Example

```json
{
  "event_name": "workflow_sub_step_comment_added",
  "data": {
    "task": {
      "id": "5f6a0312a5963d0591015e3e",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e",
      }
    },
    "step": {
      "id": "5f68911d83eeb10591933b49",
    },
    "sub_step": {
      "id": "5f68911d83eeb10591933b4a",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a",
        "comments": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a/comments"
      }
    },
    "comment": {
      "id": "8f68911d83eeb10591933b4q",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a/comments/8f68911d83eeb10591933b4q",
      }
    }
  }
}
```

## workflow\_sub\_step\_comment\_modified

A top-level comment was modified in a workflow substep of a task.

### Payload

| Key                                 | Type   | Description                                                           |
| ----------------------------------- | ------ | --------------------------------------------------------------------- |
| event\_name                         | string | Name of the event. The value is `workflow_sub_step_comment_modified`. |
| data                                | object | Data of the event.                                                    |
| data\[task]                         | object | Data of the task associated with the substep.                         |
| data\[task]\[id]                    | string | Unique identifier of the task.                                        |
| data\[task]\[links]                 | object | Links related to the task.                                            |
| data\[task]\[links]\[self]          | string | URL to fetch the task through the CMP Open API.                       |
| data\[step]                         | object | Data of the step associated with the substep.                         |
| data\[step]\[id]                    | string | Unique identifier of the step.                                        |
| data\[sub\_step]                    | object | Data of the substep.                                                  |
| data\[sub\_step]\[id]               | string | Unique identifier of the substep.                                     |
| data\[sub\_step]\[links]            | object | Links related to the substep.                                         |
| data\[sub\_step]\[links]\[self]     | string | URL to fetch the substep through the CMP Open API.                    |
| data\[sub\_step]\[links]\[comments] | string | URL to fetch the substep comments through the CMP Open API.           |
| data\[comment]                      | object | Data of the comment.                                                  |
| data\[comment]\[id]                 | string | Unique identifier of the comment.                                     |
| data\[comment]\[links]              | object | Links related to the comment.                                         |
| data\[comment]\[links]\[self]       | string | URL to fetch the comment through the CMP Open API.                    |

### Example

```json
{
  "event_name": "workflow_sub_step_comment_modified",
  "data": {
    "task": {
      "id": "5f6a0312a5963d0591015e3e",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e",
      }
    },
    "step": {
      "id": "5f68911d83eeb10591933b49",
    },
    "sub_step": {
      "id": "5f68911d83eeb10591933b4a",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a",
        "comments": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a/comments"
      }
    },
    "comment": {
      "id": "8f68911d83eeb10591933b4q",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a/comments/8f68911d83eeb10591933b4q",
      }
    }
  }
}
```

## workflow\_sub\_step\_comment\_removed

A top-level comment was removed from a workflow substep of a task.

### Payload

| Key                                 | Type   | Description                                                          |
| ----------------------------------- | ------ | -------------------------------------------------------------------- |
| event\_name                         | string | Name of the event. The value is `workflow_sub_step_comment_removed`. |
| data                                | object | Data of the event.                                                   |
| data\[task]                         | object | Data of the task associated with the substep.                        |
| data\[task]\[id]                    | string | Unique identifier of the task.                                       |
| data\[task]\[links]                 | object | Links related to the task.                                           |
| data\[task]\[links]\[self]          | string | URL to fetch the task through the CMP Open API.                      |
| data\[step]                         | object | Data of the step associated with the substep.                        |
| data\[step]\[id]                    | string | Unique identifier of the step.                                       |
| data\[sub\_step]                    | object | Data of the substep.                                                 |
| data\[sub\_step]\[id]               | string | Unique identifier of the substep.                                    |
| data\[sub\_step]\[links]            | object | Links related to the substep.                                        |
| data\[sub\_step]\[links]\[self]     | string | URL to fetch the substep through the CMP Open API.                   |
| data\[sub\_step]\[links]\[comments] | string | URL to fetch the substep comments through the CMP Open API.          |
| data\[comment]                      | object | Data of the comment.                                                 |
| data\[comment]\[id]                 | string | Unique identifier of the comment.                                    |

### Example

```json
{
  "event_name": "workflow_sub_step_comment_removed",
  "data": {
    "task": {
      "id": "5f6a0312a5963d0591015e3e",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e",
      }
    },
    "step": {
      "id": "5f68911d83eeb10591933b49",
    },
    "sub_step": {
      "id": "5f68911d83eeb10591933b4a",
      "links": {
        "self": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a",
        "comments": "https://api.cmp.optimizely.com/v3/tasks/5f6a0312a5963d0591015e3e/steps/5f68911d83eeb10591933b49/sub-steps/5f68911d83eeb10591933b4a/comments",
      }
    },
    "comment": {
      "id": "8f68911d83eeb10591933b4q",
    }
  }
}
```