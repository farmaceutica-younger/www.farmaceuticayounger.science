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
import { Timestamp } from "../google/protobuf/timestamp";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "pkg.fy.science.jobs";

export interface GetJobsReq {
  companyIds: string[];
  skip: number;
  take: number;
}

export interface GetJobsRes {
  jobs: Job[];
}

export interface CountJobsReq {
  companyIds: string[];
}

export interface CountJobsRes {
  total: number;
}

export interface CreateJobsReq {
  jobs: CreateJobData[];
}

export interface CreateJobData {
  title: string;
  description: string;
  url: string;
  companyId: string;
  location: string;
  postedAt: Date | undefined;
}

export interface CreateJobsRes {}

export interface Job {
  title: string;
  description: string;
  url: string;
  companyId: string;
  location: string;
  postedAt: Date | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

function createBaseGetJobsReq(): GetJobsReq {
  return { companyIds: [], skip: 0, take: 0 };
}

export const GetJobsReq = {
  encode(
    message: GetJobsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.companyIds) {
      writer.uint32(10).string(v!);
    }
    if (message.skip !== 0) {
      writer.uint32(16).uint32(message.skip);
    }
    if (message.take !== 0) {
      writer.uint32(24).uint32(message.take);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobsReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.companyIds.push(reader.string());
          break;
        case 2:
          message.skip = reader.uint32();
          break;
        case 3:
          message.take = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetJobsReq {
    return {
      companyIds: Array.isArray(object?.companyIds)
        ? object.companyIds.map((e: any) => String(e))
        : [],
      skip: isSet(object.skip) ? Number(object.skip) : 0,
      take: isSet(object.take) ? Number(object.take) : 0,
    };
  },

  toJSON(message: GetJobsReq): unknown {
    const obj: any = {};
    if (message.companyIds) {
      obj.companyIds = message.companyIds.map((e) => e);
    } else {
      obj.companyIds = [];
    }
    message.skip !== undefined && (obj.skip = Math.round(message.skip));
    message.take !== undefined && (obj.take = Math.round(message.take));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetJobsReq>, I>>(
    object: I
  ): GetJobsReq {
    const message = createBaseGetJobsReq();
    message.companyIds = object.companyIds?.map((e) => e) || [];
    message.skip = object.skip ?? 0;
    message.take = object.take ?? 0;
    return message;
  },
};

function createBaseGetJobsRes(): GetJobsRes {
  return { jobs: [] };
}

export const GetJobsRes = {
  encode(
    message: GetJobsRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.jobs) {
      Job.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetJobsRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetJobsRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.jobs.push(Job.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetJobsRes {
    return {
      jobs: Array.isArray(object?.jobs)
        ? object.jobs.map((e: any) => Job.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetJobsRes): unknown {
    const obj: any = {};
    if (message.jobs) {
      obj.jobs = message.jobs.map((e) => (e ? Job.toJSON(e) : undefined));
    } else {
      obj.jobs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetJobsRes>, I>>(
    object: I
  ): GetJobsRes {
    const message = createBaseGetJobsRes();
    message.jobs = object.jobs?.map((e) => Job.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCountJobsReq(): CountJobsReq {
  return { companyIds: [] };
}

export const CountJobsReq = {
  encode(
    message: CountJobsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.companyIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CountJobsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCountJobsReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.companyIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CountJobsReq {
    return {
      companyIds: Array.isArray(object?.companyIds)
        ? object.companyIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: CountJobsReq): unknown {
    const obj: any = {};
    if (message.companyIds) {
      obj.companyIds = message.companyIds.map((e) => e);
    } else {
      obj.companyIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CountJobsReq>, I>>(
    object: I
  ): CountJobsReq {
    const message = createBaseCountJobsReq();
    message.companyIds = object.companyIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseCountJobsRes(): CountJobsRes {
  return { total: 0 };
}

export const CountJobsRes = {
  encode(
    message: CountJobsRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CountJobsRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCountJobsRes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.total = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CountJobsRes {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
    };
  },

  toJSON(message: CountJobsRes): unknown {
    const obj: any = {};
    message.total !== undefined && (obj.total = Math.round(message.total));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CountJobsRes>, I>>(
    object: I
  ): CountJobsRes {
    const message = createBaseCountJobsRes();
    message.total = object.total ?? 0;
    return message;
  },
};

function createBaseCreateJobsReq(): CreateJobsReq {
  return { jobs: [] };
}

export const CreateJobsReq = {
  encode(
    message: CreateJobsReq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.jobs) {
      CreateJobData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateJobsReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateJobsReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.jobs.push(CreateJobData.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateJobsReq {
    return {
      jobs: Array.isArray(object?.jobs)
        ? object.jobs.map((e: any) => CreateJobData.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateJobsReq): unknown {
    const obj: any = {};
    if (message.jobs) {
      obj.jobs = message.jobs.map((e) =>
        e ? CreateJobData.toJSON(e) : undefined
      );
    } else {
      obj.jobs = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateJobsReq>, I>>(
    object: I
  ): CreateJobsReq {
    const message = createBaseCreateJobsReq();
    message.jobs = object.jobs?.map((e) => CreateJobData.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateJobData(): CreateJobData {
  return {
    title: "",
    description: "",
    url: "",
    companyId: "",
    location: "",
    postedAt: undefined,
  };
}

export const CreateJobData = {
  encode(
    message: CreateJobData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.companyId !== "") {
      writer.uint32(34).string(message.companyId);
    }
    if (message.location !== "") {
      writer.uint32(42).string(message.location);
    }
    if (message.postedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.postedAt),
        writer.uint32(50).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateJobData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateJobData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.url = reader.string();
          break;
        case 4:
          message.companyId = reader.string();
          break;
        case 5:
          message.location = reader.string();
          break;
        case 6:
          message.postedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateJobData {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      url: isSet(object.url) ? String(object.url) : "",
      companyId: isSet(object.companyId) ? String(object.companyId) : "",
      location: isSet(object.location) ? String(object.location) : "",
      postedAt: isSet(object.postedAt)
        ? fromJsonTimestamp(object.postedAt)
        : undefined,
    };
  },

  toJSON(message: CreateJobData): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    message.companyId !== undefined && (obj.companyId = message.companyId);
    message.location !== undefined && (obj.location = message.location);
    message.postedAt !== undefined &&
      (obj.postedAt = message.postedAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateJobData>, I>>(
    object: I
  ): CreateJobData {
    const message = createBaseCreateJobData();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    message.companyId = object.companyId ?? "";
    message.location = object.location ?? "";
    message.postedAt = object.postedAt ?? undefined;
    return message;
  },
};

function createBaseCreateJobsRes(): CreateJobsRes {
  return {};
}

export const CreateJobsRes = {
  encode(
    _: CreateJobsRes,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateJobsRes {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateJobsRes();
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

  fromJSON(_: any): CreateJobsRes {
    return {};
  },

  toJSON(_: CreateJobsRes): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateJobsRes>, I>>(
    _: I
  ): CreateJobsRes {
    const message = createBaseCreateJobsRes();
    return message;
  },
};

function createBaseJob(): Job {
  return {
    title: "",
    description: "",
    url: "",
    companyId: "",
    location: "",
    postedAt: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  };
}

export const Job = {
  encode(message: Job, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    if (message.companyId !== "") {
      writer.uint32(34).string(message.companyId);
    }
    if (message.location !== "") {
      writer.uint32(42).string(message.location);
    }
    if (message.postedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.postedAt),
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(58).fork()
      ).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.updatedAt),
        writer.uint32(66).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Job {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.url = reader.string();
          break;
        case 4:
          message.companyId = reader.string();
          break;
        case 5:
          message.location = reader.string();
          break;
        case 6:
          message.postedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.updatedAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Job {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      url: isSet(object.url) ? String(object.url) : "",
      companyId: isSet(object.companyId) ? String(object.companyId) : "",
      location: isSet(object.location) ? String(object.location) : "",
      postedAt: isSet(object.postedAt)
        ? fromJsonTimestamp(object.postedAt)
        : undefined,
      createdAt: isSet(object.createdAt)
        ? fromJsonTimestamp(object.createdAt)
        : undefined,
      updatedAt: isSet(object.updatedAt)
        ? fromJsonTimestamp(object.updatedAt)
        : undefined,
    };
  },

  toJSON(message: Job): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.url !== undefined && (obj.url = message.url);
    message.companyId !== undefined && (obj.companyId = message.companyId);
    message.location !== undefined && (obj.location = message.location);
    message.postedAt !== undefined &&
      (obj.postedAt = message.postedAt.toISOString());
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined &&
      (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Job>, I>>(object: I): Job {
    const message = createBaseJob();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.url = object.url ?? "";
    message.companyId = object.companyId ?? "";
    message.location = object.location ?? "";
    message.postedAt = object.postedAt ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

export type JobsService = typeof JobsService;
export const JobsService = {
  getJobs: {
    path: "/pkg.fy.science.jobs.Jobs/GetJobs",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetJobsReq) =>
      Buffer.from(GetJobsReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetJobsReq.decode(value),
    responseSerialize: (value: GetJobsRes) =>
      Buffer.from(GetJobsRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetJobsRes.decode(value),
  },
  countJobs: {
    path: "/pkg.fy.science.jobs.Jobs/CountJobs",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CountJobsReq) =>
      Buffer.from(CountJobsReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CountJobsReq.decode(value),
    responseSerialize: (value: CountJobsRes) =>
      Buffer.from(CountJobsRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CountJobsRes.decode(value),
  },
  createJobs: {
    path: "/pkg.fy.science.jobs.Jobs/CreateJobs",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateJobsReq) =>
      Buffer.from(CreateJobsReq.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateJobsReq.decode(value),
    responseSerialize: (value: CreateJobsRes) =>
      Buffer.from(CreateJobsRes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateJobsRes.decode(value),
  },
} as const;

export interface JobsServer extends UntypedServiceImplementation {
  getJobs: handleUnaryCall<GetJobsReq, GetJobsRes>;
  countJobs: handleUnaryCall<CountJobsReq, CountJobsRes>;
  createJobs: handleUnaryCall<CreateJobsReq, CreateJobsRes>;
}

export interface JobsClient extends Client {
  getJobs(
    request: GetJobsReq,
    callback: (error: ServiceError | null, response: GetJobsRes) => void
  ): ClientUnaryCall;
  getJobs(
    request: GetJobsReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetJobsRes) => void
  ): ClientUnaryCall;
  getJobs(
    request: GetJobsReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetJobsRes) => void
  ): ClientUnaryCall;
  countJobs(
    request: CountJobsReq,
    callback: (error: ServiceError | null, response: CountJobsRes) => void
  ): ClientUnaryCall;
  countJobs(
    request: CountJobsReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CountJobsRes) => void
  ): ClientUnaryCall;
  countJobs(
    request: CountJobsReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CountJobsRes) => void
  ): ClientUnaryCall;
  createJobs(
    request: CreateJobsReq,
    callback: (error: ServiceError | null, response: CreateJobsRes) => void
  ): ClientUnaryCall;
  createJobs(
    request: CreateJobsReq,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateJobsRes) => void
  ): ClientUnaryCall;
  createJobs(
    request: CreateJobsReq,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateJobsRes) => void
  ): ClientUnaryCall;
}

export const JobsClient = makeGenericClientConstructor(
  JobsService,
  "pkg.fy.science.jobs.Jobs"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): JobsClient;
  service: typeof JobsService;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
