import {
  PiStudentBold,
  PiStudentDuotone,
  PiStudentFill,
  PiStudentThin,
} from 'react-icons/pi'
import { FaHome, FaWpforms } from 'react-icons/fa'
export const routes = [
  { id: 1, label: 'Home', href: '/', Icon: FaHome },
  { id: 2, label: 'New Students', href: '/Newstudents', Icon: PiStudentFill },
  {
    id: 3,
    label: 'Potential Students',
    href: '/Potientialstudents',
    Icon: PiStudentDuotone,
  },
  {
    id: 4,
    label: 'Signed Up Students',
    href: '/Signedup',
    Icon: PiStudentThin,
  },
  {
    id: 5,
    label: 'Not Interested',
    href: '/NotInterested',
    Icon: PiStudentBold,
  },
  { id: 6, label: 'Testing Area', href: '/testing', Icon: FaWpforms },
  // { id: 6, label: 'Users', href: '/users', Icon: FaUsers },
]
