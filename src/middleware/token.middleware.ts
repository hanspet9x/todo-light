import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../services/response/ResponseService";
import { TokenService } from "../services/token/TokenService";
import axios, { AxiosResponse } from 'axios';
import { appConfigs } from './../configs/app';
import { IResponse } from './../services/response/interface/response.types';

export const validateTokenMiddleware =
  () => async (request: Request, response: Response, next: NextFunction) => {
    const bearerToken = request.headers.authorization;
    if (bearerToken) {
      const token = bearerToken.replace("Bearer ", "");
      try {
        const { email } = TokenService.verify<{ email: string }>(token);
        //hit auth service
        console.log(appConfigs.authHost);
        const {data} = await axios.post<any, AxiosResponse<IResponse>, any>(appConfigs.authHost, {token});
        if(!data.error && data.data){
          next();
          return;
        }
        ResponseService.unauthorized(response, "Invalid token.");
      } catch (error: any) {
        ResponseService.unauthorized(response, error.message);
        return;
      }
    }
    ResponseService.unauthorized(
      response,
      "Bearer Token authorization is required."
    );
    return;
  };
