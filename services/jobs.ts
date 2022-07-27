import * as g from "../src/proto/jobs/service";
import { CreateClientContructor, promisifyAll } from "./grpc-promisify";

export const NewJobsClient = CreateClientContructor(g.JobsClient);
export type JobsClient = promisifyAll<g.JobsClient>;
