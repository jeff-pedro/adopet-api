// dependencies
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// assets
// import { pets } from '../data/data.js';

// components
import CardPet from './CardPet.js';

const Home = () => {

  // call api
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pets');
        const body = await response.json();
        setPets(body);
      } catch (err) {
        console.log('error', err);
      }
    }

    fetchData();
  }, []);

  return (
    <motion.section className='home' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
      <p>Olá! <br /> Veja os amigos disponíveis para adoção!</p>
      <div className='cards'>
        {
          pets.map((pet, i) => (
            <CardPet
              age={pet.birthday}
              size={pet.size}
              behavior={pet.personality}
              city={pet.city}
              name={pet.name}
              img={pet.profilePictureUrl}
              key={i}
            />
          ))
        }
      </div>
    </motion.section >
  );
};

export default Home;