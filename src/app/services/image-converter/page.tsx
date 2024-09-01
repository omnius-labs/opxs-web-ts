'use client';

import { Button } from 'flowbite-react';
import { FaFileImage } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

import { Header } from '@/features/shared/components';

export default function Page() {
  return (
    <main>
      <Header />
      <div className="flex flex-col justify-center space-y-4 m-8">
        <h1 className="text-4xl text-center m-8">Image Converter</h1>
        <div className="border-x border-t border-gray-300">
          <div className="flex flex-col">
            <div className="flex items-center border-b border-gray-300 p-4 space-x-4">
              <FaFileImage />
              <div className="text-xl grow">example.png</div>
              <button className="text-gray border-none rounded-lg cursor-pointer">
                <IoIosClose className="size-10" />
              </button>
            </div>
            <div className="flex items-center border-b border-gray-300 p-4 space-x-4">
              <FaFileImage />
              <div className="text-xl grow">example.png</div>
              <button className="text-gray border-none rounded-lg cursor-pointer">
                <IoIosClose className="size-10" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button size="lg" color="dark">
            Add Files
          </Button>
          <Button size="lg" color="purple">
            Convert
          </Button>
        </div>
      </div>
    </main>
  );
}
