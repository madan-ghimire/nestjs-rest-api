import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    // Add a simple check for undefined user
    if (!request.user) {
      return null; // Or whatever default value makes sense
    }

    if (data) {
      return request.user[data as keyof typeof request.user];
    }
    return request.user;
  },
);
