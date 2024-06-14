import { Button, Card, Textarea } from 'flowbite-react'
import React, { useState } from 'react'
import MultiSelect from '../../General/Multiselect';

function TeacherMatches() {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const options = ['Option 1', 'Option 2', 'Option 3'];
    return (
        <div className="w-full flex items-center min-h-screen">
            <div className="flex justify-center items-center w-full py-6">
                <Card href="#" className="w-50">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Matches
                    </h5>
                    <div className="w-full flex flex-col gap-5">
                        <Button>
                            <p className='text-black'>Titulo 1</p>
                        </Button>
                        <Button>
                            <p className='text-black'>Titulo 2</p>
                        </Button>
                        <Button>
                            <p className='text-black'>Titulo 3</p>
                        </Button>
                        <Button>
                            <p className='text-black'>Titulo 4</p>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TeacherMatches