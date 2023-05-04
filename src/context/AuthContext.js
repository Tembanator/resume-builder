import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

  const [user, setUser] = useState({});

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email), {
      firstname: 'Dani',
      lastname: 'Schwaiger',
      applicantJobTitle: 'Web developer',
      profile: 'I am a qualified and professional web developer with five years of experience in database administration and website design. Strong creative and analytic skills. Team player with an eye for detail.',
      contact: [
        { phone: '123-456-7890' },
        { email: 'dani@gmail.com' },
        { address: 'Mbabane, Swaziland' },
        { website: 'www.dani.com' }
      ],
      // profilePic: pic1,
      skills: [
        'Web Design',
        'Design Thinking',
        'Wireframe Creation',
        'Front End Coding',
        'Problem-Solving',
        'Problem-Solving',
        'Computer Literacy',
        'Project Management Tools',
        'Strong Communication'
      ],
      education: [
        {
          certificate: 'SECONDARY SCHOOL',
          school: 'Really Great High School',
          duration: '2010 - 2014'
        },
        {
          certificate: 'Bachelor of Technology',
          school: 'Really Great University',
          duration: '2014 - 2016'
        }
      ],
      experience: [
        {
          jobTitle: 'APPLICATIONS DEVELOPER',
          company: 'Really Great Company',
          duration: '2016 - Present',
          duties: [
            'Database administration and website design',
            'Built the logic for a streamlined ad-serving platform that scaled',
            'Educational institutions and online classroom management'
          ]
        },
        {
          jobTitle: 'APPLICATIONS DEVELOPER',
          company: 'Really Great Company',
          duration: '2014 - 2016',
          duties: [
            'Database administration and website design',
            'Built the logic for a streamlined ad-serving platform that scaled',
            'Educational institutions and online classroom management'
          ]
        },
      ]
    })
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}