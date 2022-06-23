import { DateTime } from 'luxon'
import type { NextPage } from 'next'
import Head from 'next/head'

const exercise = {
  name: 'Bench Press',
  final: 'Drop Set',
  previous: [
    {
      reps: 8,
      weight: 70,
    },
    {
      reps: 8,
      weight: 70,
    },
    {
      reps: 8,
      weight: 70,
    },
    {
      reps: 8,
      weight: 70,
    },
  ],
  current: [
    {
      reps: '6-8',
      weight: 80,
    },
  ],
}

const Sets = () => {
  return (
    <div className="bg-neutral-900 text-gray-50 px-4 shadow">
      <h2 className="text-2xl py-8">Sets</h2>
      <h3>Previous</h3>
      <div className="flex gap-16 py-8">
        <div className="flex flex-col items-start">
          <div className="text-2xl">4</div>
          <div className="text-sm font-light uppercase">Sets</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">8</div>
          <div className="text-sm font-light uppercase">Reps</div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-2xl">50</div>
          <div className="text-sm font-light uppercase">lbs</div>
        </div>
      </div>
      <ul>
        <li className="grid grid-cols-9 gap-8">
          <div>Set</div>
          <div className="col-span-4">Reps</div>
          <div className="col-span-4">Weight</div>
        </li>
        {exercise.previous.map((s, key) => (
          <li key={key} className="grid grid-cols-9 gap-8 py-8">
            <div>{key + 1}</div>
            <div className="mt-1 relative rounded-md shadow-sm col-span-4">
              <input
                type="number"
                defaultValue={`${s.reps}`}
                className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 bg-neutral-800"
              />
            </div>
            <div className="mt-1 relative rounded-md col-span-4">
              <input
                type="number"
                defaultValue={s.weight}
                className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 bg-neutral-800"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  lbs
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

type NameProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>

const Name = ({ children, ...rest }: NameProps) => (
  <div className="bg-black px-4 py-12 text-white">
    <h1 className="py-4 font-semibold text-3xl">{children}</h1>
    <h2>{DateTime.now().minus({ week: 1 }).toRelative()}</h2>
  </div>
)

const Home: NextPage = () => {
  return (
    <div className="bg-neutral-900">
      <Head>
        <title>FitZer0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pb-8">
        <Name>{exercise.name}</Name>
        <Sets />
        <div className="px-4">
          <button className="text-white border w-full py-4 border-neutral-300">
            Next
          </button>
        </div>
      </main>
    </div>
  )
}

export default Home
