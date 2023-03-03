import { defer } from "@remix-run/node"
import { Await, useLoaderData } from "@remix-run/react"
import { Suspense } from "react"

export const loader = () => {
  return defer({
    hello: 'Hello',
    world: new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('World')
      }, 2000)
    })
  })
}

export default function Test() {
  const data = useLoaderData<typeof loader>()
  console.log(data)
  const { hello, world } = data

  return (
    <main>
      <pre>hello: {hello}</pre>
      <pre>
        world:{' '}
        <Suspense fallback="Loading...">
          <Await resolve={world}>
            {(world) => {
              return world
            }}
          </Await>
        </Suspense>
      </pre>
    </main>
  )
}

