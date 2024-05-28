import React, { useState, useEffect } from 'react';
import PolyCard from './PolyCard.jsx';
import DocCard from './DocCard.jsx';
import config from '../config.mjs';
import './Appointment.css';
import AppCard from './AppCard.jsx';

function Appointment() {
  const [polyclinics, setPolyclinics] = useState([]);
  const [selectedPolyclinic, setSelectedPolyclinic] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointment, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [date, setDate] = useState("");

  // Sayfa Açıldığında Poliklinikleri Listeleyen API.
  useEffect(() => {
    showPolyclinics();
  }, []);

  // DB'den Poliklinkleri Listeleyen API.
  const showPolyclinics = () => {
    fetch(`http://localhost:${config.PORT}/polyclinic`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
          setPolyclinics([]);
        } 
        if(data) {
          setPolyclinics(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const selectPolyclinic = (polyclinic) => {
    setSelectedPolyclinic(polyclinic);
    setPolyclinics([]);
    showDoctors(polyclinic);
  };

  // Seçilen Poliklinikteki Doktorları Görüntüleyen API.
  const showDoctors = (polyclinic) => {
    try {
      fetch(`http://localhost:${config.PORT}/polyclinic/${polyclinic._id}/doctor`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.ERROR) {
          alert(data.ERROR);
          setSelectedPolyclinic("");
          showPolyclinics();
        } 
        if (data) {
          setDoctors(data);
          setPolyclinics([]);
        }
      })
    } catch (err) {
      console.log(err);
    }
  };

  const selectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctors([]);
  };

  const resetSelectionDoctor = () => {
    setSelectedPolyclinic("");
    setDoctors([]);
    setSelectedDoctor("");
    showPolyclinics();
  };

  const showAppointments = async () => {
    try {
      await fetch(`http://localhost:${config.PORT}/polyclinic/${selectedDoctor.polyclinicID}/doctor/${selectedDoctor._id}/appointment/${date}`, {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json",
          }
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.ERROR) {
          addAppointment();
          return;
        }
        setAppointments(data);
        console.log(data)
      })

    } catch (err) {
        console.log(err);
    }
  };

  // Randevu Oluşturma API'si.
  const addAppointment = async () => {
    try {
        if(selectedDoctor, date) {
            await fetch(`http://localhost:${config.PORT}/admin/polyclinic/${selectedDoctor.polyclinicID}/doctor/${selectedDoctor._id}/appointment/add`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    date: date,
                }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.ERROR) {
                  alert(data.ERROR);
                }
                if(data.STATUS){
                  setAppointments(data);
                  showAppointments();
                }
            })
        }
        else
            throw new Error("Lütfen Gerekli Alanları Doldurunuz!!");

    } catch (err) {
        console.log(err);
    }
  };

  const selectAppointment = async (e) => {
    e.preventDefault();
    await showAppointments(e);
    console.log(appointment);
  };

  const resetSelectionAppointment = () => {
    setSelectedDoctor("");
    setAppointments([]);
    showDoctors(selectedPolyclinic);
  };

  const RemoveTime = (str) => {
    if (!str)
      return '';
    return str.split('T')[0];
  };

  return (
    <div>
      <div className="grid">
        {polyclinics.map((polyclinic, index) => (
          <PolyCard 
            key={index}
            name={polyclinic.name} 
            description={polyclinic.description} 
            imgSrc={polyclinic.imgSrc || './src/assets/default-card.jpg'}
            onClick={() => selectPolyclinic(polyclinic)}
          />
        ))}
      </div>
      {selectedPolyclinic && !selectedDoctor && (
        <div className="doctors-list">
          <button id='polybutton3' onClick={resetSelectionDoctor}>Poliklinik Seçimine Dön</button>
          <ul>
            {doctors.map((doctor, index) => (
              <DocCard
              key={index}
              name={doctor.speciality + " " + doctor.name} 
              polyclinicName={doctor.polyclinic} 
              imgSrc={doctor.imgSrc || './src/assets/default-card.jpg'}
              onClick={() => selectDoctor(doctor)}
            />
            ))}
          </ul>
        </div>
      )}
      {selectedPolyclinic && selectedDoctor && (
        <div className="appointment-form">
          <h2 id='doktoradih2'>{selectedDoctor.polyclinic} - {selectedDoctor.speciality + " " + selectedDoctor.name}</h2>
          <form onSubmit={selectAppointment}>
            <div id='tarihdivi'>
              <label>Randevu Tarihi:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <button id='tarihbutonu' type="submit">Randevu Bul</button>
          </form>
        </div>
      )}
      {selectedPolyclinic && selectedDoctor && appointment.length !== 0  && (
        <div className="appointment-list">
          <button id='doktordonus' onClick={resetSelectionAppointment}>Doktor Seçimine Dön</button>
          <h3 id='randevusaatih3'>Randevu Saatleri</h3>
          <ul id='saatlistesi'>
              <AppCard 
                date={RemoveTime(appointment.date)}
                time={appointment.time}
                active={appointment.active}
              />
          </ul>
        </div>
      )}
    </div>
  );
}

export default Appointment;