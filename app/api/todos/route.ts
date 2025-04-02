interface Todo {
  id: number;
  task: string;
}

let todos: Todo[] = []; 

export async function GET() {
  return new Response(JSON.stringify(todos), { status: 200 });
}

export async function POST(req: Request) {
  const { task }: { task: string } = await req.json();
  const newTodo: Todo = { id: Date.now(), task };
  todos.push(newTodo);
  return new Response(JSON.stringify(newTodo), { status: 201 });
}

export async function DELETE(req: Request) {
  const { id }: { id: number } = await req.json();
  todos = todos.filter(todo => todo.id !== id);
  return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
}

export async function PUT(req: Request) {
  const { id, task }: { id: number; task: string } = await req.json();
  todos = todos.map(todo => todo.id === id ? { ...todo, task } : todo);
  return new Response(JSON.stringify({ message: 'Updated' }), { status: 200 });
}
