import { Loginoptions } from '@/app/api/auth/[...nextauth]/route'
import Chart from '@/components/Chart'
import { Event } from '@/models/Event'
import { Page } from '@/models/Page'
import { isToday } from 'date-fns'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const AnalyticsPage = async () => {

  const session = await getServerSession(Loginoptions)

  if (!session) {
    return redirect("/")
  }

  await mongoose.connect(process.env.MONGODB_URI)
  const userPage = await Page.findOne({ owner: session?.user?.email })

  const groupedViews = await Event.aggregate([
    {
      $match: {
        eventType: 'view',
        uri: userPage.uri,
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d"
          },
        },
        count: {
          "$count": {},
        }
      },
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  const clickCount = await Event.find({
    page: userPage.uri,
    eventType: "click"
  })

  return (
    <div className='p-4 flex gap-4 flex-col bg-gray-200'>
      <div className=' bg-white flex flex-col gap-4 p-4 items-center'>
        <span className='font-extrabold text-purple-600 text-3xl'>Views</span>
        <Chart data={
          groupedViews.map(o => ({
            'date': o._id,
            'views': o.count
          }))
        } />
      </div>

      <div className=' bg-white flex flex-col gap-4 p-4 items-center'>
        <span className='font-extrabold text-purple-600 text-3xl'>Clicks</span>
      </div>

      <div className='bg-white mt-[-20px] overflow-x-scroll'>
        <div>
          {userPage.links.map(link => {
            return (
              <div key={link.key} className='flex border-b-2 border-gray-300 p-3 pl-5 pr-5 justify-between' >
                <div className='flex flex-col'>
                  <span className='font-bold text-xl text-gray-700 '>{link.title}</span>
                  <span className='font-bold text-lg text-gray-500 '>{link.subtitle}</span>
                  {link.url !== "" && <span className='font-bold text-md text-blue-500 flex gap-2 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    <Link ping={`/api/click?url=${btoa(link.url)}&page=${userPage.uri}`} target="_blank" href={link.url}>{link.url}</Link>
                  </span>}
                </div>
                <div className='flex justify-center items-center gap-2 ml-5'>
                  <span className='p-2 flex flex-col justify-center items-center  border-2 border-gray-200'>
                    <span className='uppercase text-2xl font-bold text-gray-900'>{
                      clickCount
                        .filter(
                          c => c.uri === link.url
                            && isToday(c.createdAt)
                        )
                        .length
                    }</span>
                    <span className='uppercase text-sm font-bold text-gray-500 w-[3rem]'>Today</span>
                  </span>
                  <span className='p-2 flex flex-col justify-center items-center  border-2 border-gray-200'>
                    <span className='uppercase text-2xl font-bold text-gray-900'>
                      {clickCount.filter(c => c.uri === link.url).length}
                    </span>
                    <span className='uppercase text-sm font-bold text-gray-500 w-[4.2rem]'>All Time</span>
                  </span>
                </div>
              </div>

            )
          })}
        </div>
      </div>

    </div >
  )
}

export default AnalyticsPage