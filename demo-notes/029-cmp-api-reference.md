> ## Documentation Index
> Fetch the complete documentation index at: https://docs.developers.optimizely.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Optimizely CMP Open REST API

Describes concepts and resources for integrating an application using the API and Webhooks.

## Prerequisites

* Knowledge of REST.
* Knowledge of JSON.
* Access to CMP.
* [Authentication](https://docs.developers.optimizely.com/content-marketing-platform/docs/authentication-1) with OAuth2.0.
* A client application that connects to CMP and consumes the API and Webhooks.

## REST API and webhooks

The CMP REST API library and [webhooks](https://docs.developers.optimizely.com/content-marketing-platform/reference/get-started) integrate with other applications in your MarTech ecosystem.

> 📘 Note
>
> The REST API is served through `https://api.cmp.optimizely.com`. You should update your integrations to use the new base URL.
>
> The previous base URL, `https://api.welcomesoftware.com/v3`, remains functional until further notice.

You can use the REST API and webhooks to achieve some of the following examples:

### Sync assets with the Asset API and Webhooks (library)

The Asset API can sync supported assets with the following:

* The CMP library with an Optimizely Digital Asset Manager (DAM).
* Asset metadata between two systems.
* A Sales Enablement or Marketing Automation platform, including the metadata needed to sort, organize, and target those assets to specialized audiences in those systems.

The Asset API can send approved images from the CMP library to a specific folder in an image repository.

### Manage external work with the Task API

The Task API can

* establish a link between a task step in CMP and a request ticket in another system. The link can let you monitor the ticket's progress as it progresses through an external workflow. 
* collaborate during a workflow step with users in an external system during the content creation process.
* defer a CMP workflow step approval to an external system for more complex legal reviews and compliance.

## Successful connection or authorization

An `access_token` represents a successful authorization. So, whenever a client application obtains an `access_token` for a CMP user, the authorization of that user for that client application is successful.

See [Authenticate](https://docs.developers.optimizely.com/content-marketing-platform/docs/authentication-1).

## Why do I have to log in on the first access?

You must log in so the authorization server can associate you as the impersonated user for the generated authorization tokens (`access_token` and `refresh_token`). After the client application generates the authorization tokens (`access_token` and `refresh_token`), the client application can periodically refresh the tokens without requiring re-authentication from the user.

The first time you establish a successful connection with the CMP Authorization Server, you are prompted to enter a user ID and Password because the browser serves as the front-end to the CMP Authorization server. Subsequent attempts look for your client application to verify the access token.

> 📘 Note
>
> Do not build URLs manually to fetch related resources. Instead, use the URLs provided in the links field in the response as-is without any manipulation.

## Experimental APIs

Some API endpoints have a banner indicating that the API is `experimental`.

Experimental APIs provide early access to APIs that are under development. The documentation may highlight new features, new data properties and data models, new filters, and other features specific to the new API.

Optimizely gives you early access to the documentation for these APIs in the experimental stage so you can plan for their implementation and provide feedback. These APIs are usually NOT operational, and the documentation may change until they are fully released.

Experimental APIs require testing and development on your applications before relying on them in your stable production environments.