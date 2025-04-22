import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      return undefined;
    }
    if (data) {
      return request.user[data] as unknown;
    }

    return request.user;
  },
);
