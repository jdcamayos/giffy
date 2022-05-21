import * as boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

function withErrorStack(error: any, stack: string) {
	if (process.env.NODE_ENV === 'development') {
		return { ...error, stack }
	}
}

export function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
	console.log(err)
	next(err)
}

export function wrapErrors(err: any, req: Request, res: Response, next: NextFunction) {
	if (!err.isBoom) {
		next(boom.badImplementation(err))
	}
	next(err)
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	const {
		output: { statusCode, payload },
	} = err
	res.status(statusCode)
	res.json(withErrorStack(payload, err.stack))
}
