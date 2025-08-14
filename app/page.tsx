import React from 'react'
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import './globals.css';
import { dummyInterviews } from '../constants/index';
import InterviewCard from '../components/InterviewCard';

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2> Get Interview-Ready with AI-powered Practise & Feedback </h2>
          <p className="text-lg">
            Practise on real interview question & get instant personalized feedback
          </p>

          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/interview"> Start an Interview </Link>
          </Button>
        </div>

        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2> Your Interviews </h2>
        <div className="interview-section">
          {dummyInterviews.map((interview)=>(
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-6">
        <h2> Take Mock Interviews </h2>
        <div className="interview-section">
          {dummyInterviews.map((interview)=>(
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  )
}

export default page;
