import Head from "next/head";
//import { api } from "~/utils/api";
import { analyzeLatestProfile } from "~/server/api/analyzeData";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
//import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface IFormInput {
  gpa: number;
  major: string;
}

export default function Home() {
  const user = useUser();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = async (data) => {
    try {
      // First, submit the form data
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Submitted successfully:", result);

      // Now call the server-side API endpoint for analysis
      const analysisResponse = await fetch("/api/analyze");
      const analysisResult = await analysisResponse.json();
      console.log("Analysis Result:", analysisResult);
    } catch (error) {
      console.error("Error during processing:", error);
    }
  };

  //const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  // const [formData, setFormData] = useState({
  //   gpa: "",
  //   intendedMajor: "",
  //   academicProgram: "",
  //   curriculumRanking: "",
  //   studyAbroadRanking: "",
  //   graduateSchoolRanking: "",
  //   academicSupportRanking: "",
  //   userId: "",
  // });

  // const handleSubmitWrapper = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   handleSubmit(e).catch((error) => {
  //     console.error("Error handling form submission:", error);
  //   });
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const userId = user?.user?.id;

  //   if (!userId) {
  //     console.error("User not authenticated or ID not available");
  //     return;
  //   }

  //   try {
  //     // Send formData to backend
  //     const response = await fetch("/api/submitForm", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       // Handle success
  //       console.log("Form submitted successfully");
  //     } else {
  //       // Handle errors
  //       console.error("Failed to submit form");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

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
          <a
            href="https://www.collegiate-consulting.com/"
            rel="noopener noreferrer"
          >
            {/* <Image
              src="/horizontal-white.svg"
              alt="Brand Logo"
              className="h-8 w-auto"
              width={500}
            /> */}
          </a>
          <div className="flex flex-grow items-center justify-center space-x-4 text-white">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
            <a href="#" className="hover:text-gray-300">
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
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-gray-1000 mb-2 text-lg">
                Academic Interests and Strengths:
              </p>
              <p className="text-gray-1000 mb-4 text-sm">
                A student&apos;s intended major and academic profile are the
                primary A students intended major and academic profile are the
                primary factors in determining which colleges to apply to. This
                can have a significant impact on the students academic success
                and overall college experience.
              </p>

              <p className="text-sm text-gray-600">Enter your GPA</p>
              <Input
                {...register("gpa")}
                type="number"
                placeholder="GPA: 4.3"
                className="mb-4"
                step="0.1"
                value="3.5"
              />

              <p className=" text-sm text-gray-600">Intended Major</p>
              <Input
                {...register("major")}
                className="mb-4"
                type="text"
                placeholder="Computer Science"
              />

              {/* <p className="text-sm text-gray-600">Academic Program</p>
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
              </Select> */}
              {/* Submit button */}
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Analyze
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
