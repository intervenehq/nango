import type { HTTP_VERB } from './Generic.js';
import type { SyncType, SyncConfigType, NangoConfigMetadata } from './Sync.js';

export interface NangoIntegrationDataV1 {
    type?: SyncConfigType;
    runs: string;
    returns: string[];
    input?: string;
    track_deletes?: boolean;
    auto_start?: boolean;
    attributes?: object;
    metadata?: NangoConfigMetadata;
    fileLocation?: string;
    version?: string;
    sync_config_id?: number;
    pre_built?: boolean;
    is_public?: boolean;
    endpoint?: string | string[];
}

export interface NangoIntegrationDataV2 extends NangoIntegrationDataV1 {
    sync_type?: SyncType;
    description?: string;
    'webhook-subscriptions'?: string[];
    scopes?: string[];
    output?: string | string[];
}

export interface NangoIntegrationV1 {
    // providerConfigKey
    [key: string]: {
        // flow name
        [key: string]: NangoIntegrationDataV1;
    };
}

export interface NangoV2IntegrationContents {
    provider?: string;
    syncs?: NangoIntegrationDataV2[];
    actions?: NangoIntegrationDataV2[];
}

export interface NangoV2Integration {
    // providerConfigKey
    [key: string]: NangoV2IntegrationContents;
}

export interface NangoModelV1 {
    // modelName
    [key: string]: {
        // field name
        [key: string]: string | Record<string, string>;
    };
}

export interface ModelSchema {
    [key: string]: {
        description?: string;
        type: string | Record<string, string>;
    };
}

interface Extends {
    __extends: string;
}

export interface NangoModelV2Contents {
    description?: string;
    schema: ModelSchema | Extends;
}

export interface NangoModelV2 {
    [key: string]: NangoModelV2Contents;
}

export interface NangoConfigV1 {
    integrations: NangoIntegrationV1;
    models: NangoModelV1;
}

export interface NangoConfigV2 {
    integrations: NangoV2Integration;
    models: NangoModelV1;
}

export type NangoConfig = NangoConfigV1 | NangoConfigV2;
export type NangoModel = NangoModelV1;
export type NangoIntegrationData = NangoIntegrationDataV1 | NangoIntegrationDataV2;
export type NangoIntegration = NangoIntegrationV1 | NangoV2Integration;

interface NangoSyncModelField {
    name: string;
    type: string;
    description?: string;
}

export interface NangoSyncModel {
    name: string;
    description?: string;
    fields: NangoSyncModelField[];
}

export type NangoSyncEndpoint = {
    [key in HTTP_VERB]?: string;
};

export interface NangoSyncConfig {
    name: string;
    type?: SyncConfigType;
    runs: string;
    auto_start?: boolean;
    attributes?: object;
    description?: string;
    scopes?: string[];
    metadata?: NangoConfigMetadata;
    track_deletes?: boolean;
    returns: string[];
    models: NangoSyncModel[];
    endpoints: NangoSyncEndpoint[];

    // v2 additions
    input?: NangoSyncModel;
    sync_type?: SyncType;
    webhookSubscriptions?: string[];
}

export interface StandardNangoConfig {
    providerConfigKey: string;
    provider?: string;
    syncs: NangoSyncConfig[];
    actions: NangoSyncConfig[];
}
