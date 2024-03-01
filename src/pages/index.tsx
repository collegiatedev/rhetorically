import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Slider } from "~/components/ui/slider";

export default function Home() {
  const { data } = api.essays.getAll.useQuery();
  const user = useUser();

  return (
    <>
      <Head>
        <title>Collegiate</title>
        <meta
          name="AI College Admission Tools"
          content="Generated by Team Collegiate"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="https://www.collegiate-consulting.com/">
            <img
              src="/horizontal-white.svg"
              alt="Brand Logo"
              className="h-8 w-auto"
            />
          </a>
          <div className="flex flex-grow items-center justify-center space-x-4 text-white">
            <a href="/home" className="hover:text-gray-300">
              Home
            </a>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </div>
          <div>
            {!user.isSignedIn && (
              <Button>
                <SignInButton />
              </Button>
            )}
            {!!user.isSignedIn && (
              <Button variant="outline">
                <SignOutButton />
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main>
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-lg">
            <p className="text-gray-1000 mb-2 text-lg">
              Academic Interests and Strengths:
            </p>
            <p className="text-gray-1000 mb-4 text-sm">
              A student's intended major and academic profile are the primary
              factors in determining which colleges to apply to. This can have a
              significant impact on the student's academic success and overall
              college experience.
            </p>

            <p className="text-sm text-gray-600">Enter your GPA</p>
            <Input
              type="number"
              placeholder="GPA: 4.3"
              className="mb-4"
              step="0.1"
              value="3.5"
            />

            <p className=" text-sm text-gray-600">Intended Major</p>
            <Input
              className="mb-4"
              type="text"
              placeholder="Computer Science"
            />

            <p className="text-sm text-gray-600">Academic Program</p>
            <Select>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English/Language Arts">
                  English/Language Arts
                </SelectItem>
                <SelectItem value="Mathematics">
                  Mathematics (e.g. Algebra, Calculus, Geometry)
                </SelectItem>
                <SelectItem value="Science">
                  Science (e.g. Biology, Chemistry, Physics)
                </SelectItem>
                <SelectItem value="Social Studies">
                  Social Studies (e.g. History, Geography, Civics)
                </SelectItem>
                <SelectItem value="Foreign Languages">
                  Foreign Languages (e.g. Spanish, French, German)
                </SelectItem>
                <SelectItem value="Fine Arts">
                  Fine Arts (e.g. Music, Art, Drama)
                </SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-gray-600">Curriculum</p>
            <Select>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Rank 1-10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-gray-600">Study Abroad</p>
            <Select>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Rank 1-10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-gray-600">Graduate School</p>
            <Select>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Rank 1-10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>

            <p className="text-sm text-gray-600">Academic Support</p>
            <Select>
              <SelectTrigger className="mb-4">
                <SelectValue placeholder="Rank 1-10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="9">9</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          {data?.map((essay) => (
            <div key={essay.id}>{essay.content}</div>
          ))}
        </div>
      </main>
    </>
  );
}
