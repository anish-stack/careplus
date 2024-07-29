import React, { useEffect, useState } from 'react';
import image from './image.jpg';
import logo from './healthcare.png';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import { Navigate } from 'react-router-dom';

const PatientForm = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(null);
  const [personalInformation, setPersonalInformation] = useState({
    FullName: '',
    Email: '',
    ContactNumber: '',
    DateOfBirth: '',
    Gender: '',
    Address: '',
    Occupation: '',
    EmergencyContactName: '',
    EmergencyContactNumber: '',
  });

  const [medicalInformation, setMedicalInformation] = useState({
    InsuranceProvider: '',
    InsurancePolicyNumber: '',
    Allergies: '', // Will be joined with ,
    CurrentMedications: '', // Will be joined with ,
    FamilyMedicalHistory: '',
    PastMedicalHistory: '',
  });

  const { toast } = useToast();

  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? (checked ? value : '') : value;

    if (section === 'personal') {
      setPersonalInformation({ ...personalInformation, [name]: updatedValue });
    } else {
      setMedicalInformation({ ...medicalInformation, [name]: updatedValue });
    }
  };

  const handleFetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/User-details', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('CarePlusUserToken')}`
        }
      });
      const userData = response.data.data;
      console.log(userData)
      setUser(userData);
      setPersonalInformation(prevState => ({
        ...prevState,
        FullName: userData.FullName || '',
        Email: userData.Email || '',
        ContactNumber: userData.Contact || ''
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      // Log personal and medical information
      // console.log('Personal Information:', personalInformation);
      console.log('Medical Information:', {
        ...medicalInformation,
        Allergies: medicalInformation.Allergies ? medicalInformation.Allergies.split(',').map(item => item.trim()) : [],
        CurrentMedications: medicalInformation.CurrentMedications ? medicalInformation.CurrentMedications.split(',').map(item => item.trim()) : []
      });

      // Submit form data
      const response = await axios.post('http://localhost:7000/api/v1/Patient-info', {
        personalInformation,
        medicalInformation
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('CarePlusUserToken')}`,
          'Content-Type': 'application/json'
        }
      });

      // Show success toast
      toast({
        title: 'Form Submitted',
        description: 'Your information has been successfully submitted.',
        variant: 'success',
        action: <ToastAction altText="Close">Close</ToastAction>,
      });

      // Optionally, you can handle the response data here if needed
      console.log('Response:', response.data);
      window.location.href = "/Home-Page"
      setIsLoading(false)
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your information. Please try again.',
        variant: 'error',
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setIsLoading(false)

    }
  };

  return (
    <div className='w-full p-4 min-h-screen '>
      <div className='max-w-screen-xl mx-auto'>
        <div className='w-full h-full flex flex-col md:flex-row justify-center px-6 py-3'>
          <div className='form-section w-full md:w-[70%]  rounded-lg p-6'>
            <div className='logo-header w-full px-4 py-5'>
              <div className='img flex items-center space-x-3 justify-start'>
                <img src={logo} className='w-12 h-12 object-cover' alt="logo" />
                <h4 className='text-pretty text-white text-lg md:text-xl font-semibold'>CarePlus</h4>
              </div>
            </div>
            <div className="titles px-4 py-5">
              <h2 className='text-lg md:text-4xl font-bold text-pretty leading-5'>Welcome👋</h2>
              <p className='text-xs md:text-sm text-gray-400'>Let us know more about yourself</p>
            </div>
            {/* Personal Information */}
            <div className='personal-info px-4 py-2'>
              <h3 className='text-lg font-semibold text-white mb-2'>Personal Information</h3>
              <div className='mb-4'>
                <label htmlFor="FullName" className='block text-gray-400 font-medium mb-2'>Full Name</label>
                <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                  <i className="fa-solid fa-user text-gray-500 mr-2"></i>
                  <Input
                    type='text'
                    value={personalInformation.FullName}
                    name="FullName"
                    onChange={(e) => handleChange(e, 'personal')}
                    placeholder='Enter your full name'
                    className='bg-transparent w-full text-white outline-none flex-1'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor="Email" className='block text-gray-400 font-medium mb-2'>Email</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-envelope text-gray-500 mr-2"></i>
                    <Input
                      type='email'
                      value={personalInformation.Email}
                      name="Email"
                      onChange={(e) => handleChange(e, 'personal')}
                      placeholder='Email'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="ContactNumber" className='block text-gray-400 font-medium mb-2'>Contact Number</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-phone text-gray-500 mr-2"></i>

                    <Input
                      type='tel'
                      value={personalInformation.ContactNumber}
                      name="ContactNumber"
                      onChange={(e) => handleChange(e, 'personal')}
                      placeholder='Contact Number'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="DateOfBirth" className='block text-gray-400 font-medium mb-2'>Date Of Birth</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    {/* <i className="fa-solid fa-calendar text-gray-500 mr-2"></i> */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left bg-transparent border-none hover:bg-transparent hover:text-white font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto bg-black text-white p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate);
                            handleChange({ target: { name: 'DateOfBirth', value: selectedDate } }, 'personal');
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <label className='block text-gray-400 font-medium mb-2'>Gender</label>
                  <ul className='flex space-x-4'>
                    <li className='flex items-center'>
                      <input
                        type='radio'
                        id='male'
                        name='Gender'
                        value='Male'
                        checked={personalInformation.Gender === 'Male'}
                        onChange={(e) => handleChange(e, 'personal')}
                        className='hidden peer'
                      />
                      <label
                        htmlFor='male'
                        className='flex items-center cursor-pointer p-2 border border-gray-400 rounded-md peer-checked:bg-gray-800 peer-checked:text-white'
                      >
                        <span className='mr-2'>♂</span>
                        <span>Male</span>
                      </label>
                    </li>
                    <li className='flex items-center'>
                      <input
                        type='radio'
                        id='female'
                        name='Gender'
                        value='Female'
                        checked={personalInformation.Gender === 'Female'}
                        onChange={(e) => handleChange(e, 'personal')}
                        className='hidden peer'
                      />
                      <label
                        htmlFor='female'
                        className='flex items-center cursor-pointer p-2 border border-gray-400 rounded-md peer-checked:bg-gray-800 peer-checked:text-white'
                      >
                        <span className='mr-2'>♀</span>
                        <span>Female</span>
                      </label>
                    </li>
                    <li className='flex items-center'>
                      <input
                        type='radio'
                        id='other'
                        name='Gender'
                        value='Other'
                        checked={personalInformation.Gender === 'Other'}
                        onChange={(e) => handleChange(e, 'personal')}
                        className='hidden peer'
                      />
                      <label
                        htmlFor='other'
                        className='flex items-center cursor-pointer p-2 border border-gray-400 rounded-md peer-checked:bg-gray-800 peer-checked:text-white'
                      >
                        <span className='mr-2'>⚥</span>
                        <span>Other</span>
                      </label>
                    </li>
                  </ul>
                </div>
                <div>
                  <label htmlFor="Address" className='block text-gray-400 font-medium mb-2'>Address</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-home text-gray-500 mr-2"></i>
                    <Input
                      type='text'
                      value={personalInformation.Address}
                      name="Address"
                      onChange={(e) => handleChange(e, 'personal')}
                      placeholder='Address'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="Occupation" className='block text-gray-400 font-medium mb-2'>Occupation</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-briefcase text-gray-500 mr-2"></i>
                    <Input
                      type='text'
                      value={personalInformation.Occupation}
                      name="Occupation"
                      onChange={(e) => handleChange(e, 'personal')}
                      placeholder='Occupation'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="EmergencyContactName" className='block text-gray-400 font-medium mb-2'>Emergency Contact Name</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-user-friends text-gray-500 mr-2"></i>
                    <Input
                      type='text'
                      value={personalInformation.EmergencyContactName}
                      name="EmergencyContactName"
                      onChange={(e) => handleChange(e, 'personal')}
                      placeholder='Emergency Contact Name'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="EmergencyContactNumber" className='block text-gray-400 font-medium mb-2'>Emergency Contact Number</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-phone-volume text-gray-500 mr-2"></i>
                    <Input
                      type='tel'
                      value={personalInformation.EmergencyContactNumber}
                      name="EmergencyContactNumber"
                      onChange={(e) => handleChange(e, 'personal')}
                      placeholder='Emergency Contact Number'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Medical Information */}
            <div className='medical-info px-4 py-2 mt-4'>
              <h3 className='text-lg font-semibold text-white mb-2'>Medical Information</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor="InsuranceProvider" className='block text-gray-400 font-medium mb-2'>Insurance Provider</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-shield-alt text-gray-500 mr-2"></i>
                    <Input
                      type='text'
                      value={medicalInformation.InsuranceProvider}
                      name="InsuranceProvider"
                      onChange={(e) => handleChange(e, 'medical')}
                      placeholder='Insurance Provider'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="InsurancePolicyNumber" className='block text-gray-400 font-medium mb-2'>Insurance Policy Number</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    <i className="fa-solid fa-file-alt text-gray-500 mr-2"></i>
                    <Input
                      type='text'
                      value={medicalInformation.InsurancePolicyNumber}
                      name="InsurancePolicyNumber"
                      onChange={(e) => handleChange(e, 'medical')}
                      placeholder='Insurance Policy Number'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="Allergies" className='block text-gray-400 font-medium mb-2'>Allergies (if any)</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    {/* <i className="fa-solid fa-pills text-gray-500 mr-2"></i> */}
                    <textarea
                      type='text'
                      value={medicalInformation.Allergies}
                      name="Allergies"
                      onChange={(e) => handleChange(e, 'medical')}
                      placeholder='ex: Peanuts, Penicillin, Pollen'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="CurrentMedications" className='block text-gray-400 font-medium mb-2'>Current Medications</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    {/* <i className="fa-solid fa-capsules text-gray-500 mr-2"></i> */}
                    <textarea
                      type='text'
                      value={medicalInformation.CurrentMedications}
                      name="CurrentMedications"
                      onChange={(e) => handleChange(e, 'medical')}
                      placeholder='ex: Ibuprofen 200mg, Levothyroxine 50mcg'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="FamilyMedicalHistory" className='block text-gray-400 font-medium mb-2'>Family medical history (if relevant)</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    {/* <i className="fa-solid fa-notes-medical text-gray-500 mr-2"></i> */}
                    <textarea
                      type='text'
                      value={medicalInformation.FamilyMedicalHistory}
                      name="FamilyMedicalHistory"
                      onChange={(e) => handleChange(e, 'medical')}
                      placeholder="ex: Mother had breast cancer"
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="PastMedicalHistory" className='block text-gray-400 font-medium mb-2'>Past Medical History</label>
                  <div className='flex items-center border border-gray-400 rounded-md p-2 bg-transparent'>
                    {/* <i className="fa-solid fa-file-medical text-gray-500 mr-2"></i> */}
                    <textarea
                      type='text'
                      value={medicalInformation.PastMedicalHistory}
                      name="PastMedicalHistory"
                      onChange={(e) => handleChange(e, 'medical')}
                      placeholder='ex: Asthma diagnosis in childhood'
                      className='bg-transparent w-full text-white outline-none flex-1'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='submit-button w-full  px-5 mt-4 flex justify-center'>
              <Button
                onClick={handleSubmit}
                className='bg-green-500 hover:bg-green-600 w-full text-white py-2 px-4 rounded-md transition-colors duration-300'
              >
                {isLoading ? <Loader /> : "Submit and continue"}
              </Button>
            </div>
          </div>
          <div className='hidden md:block image-section w-full md:w-[30%] p-6'>
            <img src={image} alt='Healthcare' className='w-full h-auto object-cover rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
