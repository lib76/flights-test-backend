import { Router, Request, Response } from 'express';

interface ExampleData {
  name: string;
  email: string;
}

interface ExampleResponse {
  message: string;
  timestamp: string;
  method?: string;
  path?: string;
  id?: string | undefined;
  data?: ExampleData;
}

interface ErrorResponse {
  error: string;
}

const router = Router();

// GET /api/example
router.get('/', (req: Request, res: Response) => {
  const response: ExampleResponse = {
    message: 'Example endpoint working!',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
  };
  res.json(response);
});

// GET /api/example/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const response: ExampleResponse = {
    message: `Example endpoint with ID: ${id}`,
    id,
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

// POST /api/example
router.post('/', (req: Request, res: Response) => {
  const { name, email }: ExampleData = req.body;

  if (!name || !email) {
    const errorResponse: ErrorResponse = {
      error: 'Name and email are required',
    };
    return res.status(400).json(errorResponse);
  }

  const response: ExampleResponse = {
    message: 'Example POST endpoint',
    data: { name, email },
    timestamp: new Date().toISOString(),
  };
  return res.status(201).json(response);
});

// PUT /api/example/:id
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email }: ExampleData = req.body;

  const response: ExampleResponse = {
    message: `Updated example with ID: ${id}`,
    id,
    data: { name, email },
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

// DELETE /api/example/:id
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const response: ExampleResponse = {
    message: `Deleted example with ID: ${id}`,
    id,
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

export default router;
