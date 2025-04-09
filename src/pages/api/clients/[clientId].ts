import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const clientId = params.clientId ?? '';
    const client = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    if (client.length > 0) {
      return new Response(
        JSON.stringify({
          method: 'GET',
          client: client[0],
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        method: 'GET',
        msg: `Client with id ${clientId} does not exist!`,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        method: 'GET',
        error,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const clientId = params.clientId ?? '';
    const { id, ...body } = await request.json();

    await db.update(Clients).set(body).where(eq(Clients.id, +clientId));

    const updatedClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    return new Response(
      JSON.stringify({
        method: 'PATCH',
        updatedClient,
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        method: 'POST',
        error,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  try {
    const clientId = params.clientId ?? '';

    const { rowsAffected } = await db
      .delete(Clients)
      .where(eq(Clients.id, +clientId));

    console.log(rowsAffected);

    if (rowsAffected > 0) {
      return new Response(
        JSON.stringify({
          method: 'DELETE',
          msg: `Client with id ${clientId} was deleted successfully!`,
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        method: 'DELETE',
        msg: `Client with id ${clientId} not found!`,
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        method: 'DELETE',
        error,
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
};
