import { Router } from "express";

export const test: Router = Router();

test.get('/', (req, res) => {
  console.log('hello')
})