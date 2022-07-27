/* eslint-disable */
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kannon";

export interface GetDomainsReq {}

export interface GetDomainsResponse {
  domains: Domain[];
}

export interface CreateDomainRequest {
  domain: string;
}

export interface RegenerateDomainKeyRequest {
  domain: string;
}

export interface Domain {
  domain: string;
  key: string;
  dkimPubKey: string;
}

function createBaseGetDomainsReq(): GetDomainsReq {
  return {};
}

export const GetDomainsReq = {
  encode(
    _: GetDomainsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDomainsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDomainsReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetDomainsReq {
    return {};
  },

  toJSON(_: GetDomainsReq): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDomainsReq>, I>>(
    _: I
  ): GetDomainsReq {
    const message = createBaseGetDomainsReq();
    return message;
  },
};

function createBaseGetDomainsResponse(): GetDomainsResponse {
  return { domains: [] };
}

export const GetDomainsResponse = {
  encode(
    message: GetDomainsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.domains) {
      Domain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDomainsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDomainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domains.push(Domain.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetDomainsResponse {
    return {
      domains: Array.isArray(object?.domains)
        ? object.domains.map((e: any) => Domain.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetDomainsResponse): unknown {
    const obj: any = {};
    if (message.domains) {
      obj.domains = message.domains.map((e) =>
        e ? Domain.toJSON(e) : undefined
      );
    } else {
      obj.domains = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetDomainsResponse>, I>>(
    object: I
  ): GetDomainsResponse {
    const message = createBaseGetDomainsResponse();
    message.domains = object.domains?.map((e) => Domain.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateDomainRequest(): CreateDomainRequest {
  return { domain: "" };
}

export const CreateDomainRequest = {
  encode(
    message: CreateDomainRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateDomainRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateDomainRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateDomainRequest {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: CreateDomainRequest): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateDomainRequest>, I>>(
    object: I
  ): CreateDomainRequest {
    const message = createBaseCreateDomainRequest();
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseRegenerateDomainKeyRequest(): RegenerateDomainKeyRequest {
  return { domain: "" };
}

export const RegenerateDomainKeyRequest = {
  encode(
    message: RegenerateDomainKeyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegenerateDomainKeyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegenerateDomainKeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegenerateDomainKeyRequest {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
    };
  },

  toJSON(message: RegenerateDomainKeyRequest): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegenerateDomainKeyRequest>, I>>(
    object: I
  ): RegenerateDomainKeyRequest {
    const message = createBaseRegenerateDomainKeyRequest();
    message.domain = object.domain ?? "";
    return message;
  },
};

function createBaseDomain(): Domain {
  return { domain: "", key: "", dkimPubKey: "" };
}

export const Domain = {
  encode(
    message: Domain,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.domain !== "") {
      writer.uint32(10).string(message.domain);
    }
    if (message.key !== "") {
      writer.uint32(18).string(message.key);
    }
    if (message.dkimPubKey !== "") {
      writer.uint32(26).string(message.dkimPubKey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Domain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDomain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.domain = reader.string();
          break;
        case 2:
          message.key = reader.string();
          break;
        case 3:
          message.dkimPubKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Domain {
    return {
      domain: isSet(object.domain) ? String(object.domain) : "",
      key: isSet(object.key) ? String(object.key) : "",
      dkimPubKey: isSet(object.dkimPubKey) ? String(object.dkimPubKey) : "",
    };
  },

  toJSON(message: Domain): unknown {
    const obj: any = {};
    message.domain !== undefined && (obj.domain = message.domain);
    message.key !== undefined && (obj.key = message.key);
    message.dkimPubKey !== undefined && (obj.dkimPubKey = message.dkimPubKey);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Domain>, I>>(object: I): Domain {
    const message = createBaseDomain();
    message.domain = object.domain ?? "";
    message.key = object.key ?? "";
    message.dkimPubKey = object.dkimPubKey ?? "";
    return message;
  },
};

export type ApiService = typeof ApiService;
export const ApiService = {
  getDomains: {
    path: "/kannon.Api/GetDomains",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetDomainsReq) =>
      Buffer.from(GetDomainsReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetDomainsReq.decode(value),
    responseSerialize: (value: GetDomainsResponse) =>
      Buffer.from(GetDomainsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetDomainsResponse.decode(value),
  },
  createDomain: {
    path: "/kannon.Api/CreateDomain",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateDomainRequest) =>
      Buffer.from(CreateDomainRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateDomainRequest.decode(value),
    responseSerialize: (value: Domain) =>
      Buffer.from(Domain.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Domain.decode(value),
  },
  regenerateDomainKey: {
    path: "/kannon.Api/RegenerateDomainKey",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RegenerateDomainKeyRequest) =>
      Buffer.from(RegenerateDomainKeyRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) =>
      RegenerateDomainKeyRequest.decode(value),
    responseSerialize: (value: Domain) =>
      Buffer.from(Domain.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Domain.decode(value),
  },
} as const;

export interface ApiServer extends UntypedServiceImplementation {
  getDomains: handleUnaryCall<GetDomainsReq, GetDomainsResponse>;
  createDomain: handleUnaryCall<CreateDomainRequest, Domain>;
  regenerateDomainKey: handleUnaryCall<RegenerateDomainKeyRequest, Domain>;
}

export interface ApiClient extends Client {
  getDomains(
    request: GetDomainsReq,
    callback: (error: ServiceError | null, response: GetDomainsResponse) => void
  ): ClientUnaryCall;
  getDomains(
    request: GetDomainsReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetDomainsResponse) => void
  ): ClientUnaryCall;
  getDomains(
    request: GetDomainsReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetDomainsResponse) => void
  ): ClientUnaryCall;
  createDomain(
    request: CreateDomainRequest,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  createDomain(
    request: CreateDomainRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  createDomain(
    request: CreateDomainRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  regenerateDomainKey(
    request: RegenerateDomainKeyRequest,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  regenerateDomainKey(
    request: RegenerateDomainKeyRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
  regenerateDomainKey(
    request: RegenerateDomainKeyRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Domain) => void
  ): ClientUnaryCall;
}

export const ApiClient = makeGenericClientConstructor(
  ApiService,
  "kannon.Api"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): ApiClient;
  service: typeof ApiService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
