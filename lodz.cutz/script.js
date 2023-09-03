function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");
const link4 = document.getElementById("link4");

if (link1 !== null) {
  link1.addEventListener('click', () => {
    scrollToElement('.header');
});
}

if (link1 !== null) {
link2.addEventListener('click', () => {
    scrollToElement('.header', 1);
});
}

if (link1 !== null) {
link3.addEventListener('click', () => {
    scrollToElement('.header', 2);
});
}

if (link1 !== null) {
link4.addEventListener('click', () => {
  scrollToElement('.header', 3);
});
}

document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submit");
    const bookingDateInput = document.getElementById("booking-date");
    const startTimeInput = document.getElementById("start-time");
    const instagramInput = document.getElementById("instagram");
    const bookingList = document.getElementById("booking-list");
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Cargar las reservas almacenadas en el localStorage al cargar la página
    storedBookings.forEach(booking => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>Nombre:</strong> ${booking.name}<br>
        <strong>Perfil de Instagram:</strong> ${booking.instagram}<br> <!-- Nuevo campo -->
        <strong>Fecha de reserva:</strong> ${booking.date}<br>
        <strong>Hora de inicio:</strong> ${booking.startTime}<br>
        <strong>Hora de finalización:</strong> ${booking.endTime}<br>
      `;
      bookingList.appendChild(listItem);
    });

    function updateDateAndTimeOptions() {
      const bookedDates = storedBookings.map(booking => booking.date);
      bookingDateInput.querySelectorAll("option").forEach(option => {
        option.disabled = bookedDates.includes(option.value);
      });

      const selectedDate = bookingDateInput.value;
      const bookedTimes = storedBookings
        .filter(booking => booking.date === selectedDate)
        .map(booking => ({
          startTime: booking.startTime,
          endTime: booking.endTime
        }));
      startTimeInput.querySelectorAll("option").forEach(option => {
        option.disabled = false;
        if (option.value !== "") {
          const optionTime = option.value;
          option.disabled = bookedTimes.some(
            bookingTime =>
              optionTime >= bookingTime.startTime && optionTime < bookingTime.endTime
          );
        }
      });
    }

    bookingDateInput.addEventListener("change", updateDateAndTimeOptions);

    updateDateAndTimeOptions();
    submitButton.addEventListener("click", function() {
      const name = document.getElementById("name").value;
      const bookingDate = document.getElementById("booking-date").value;
      const startTime = document.getElementById("start-time").value;
      const instagram = document.getElementById("instagram").value; // Nuevo campo de Instagram


      // Calculamos la hora de finalización 1 hora después de la hora de inicio
      const newBookingStartTime = new Date(`${bookingDate}T${startTime}`);
      const newBookingEndTime = new Date(newBookingStartTime);
      newBookingEndTime.setHours(newBookingEndTime.getHours() + 1);

      // Formateamos la hora de finalización como HH:MM
      const endTime = `${newBookingEndTime.getHours()}:${newBookingEndTime.getMinutes()}`;

      // Verificamos si la nueva reserva se superpone con alguna reserva existente
      const overlappingBooking = storedBookings.find(booking => {
        const bookingStartTime = new Date(`${booking.date}T${booking.startTime}`);
        const bookingEndTime = new Date(`${booking.date}T${booking.endTime}`);
        return (
          booking.date === bookingDate &&
          (
            (newBookingStartTime >= bookingStartTime && newBookingStartTime < bookingEndTime) ||
            (newBookingEndTime > bookingStartTime && newBookingEndTime <= bookingEndTime) ||
            (newBookingStartTime <= bookingStartTime && newBookingEndTime >= bookingEndTime)
          )
        );
      });

      if (name && bookingDate && startTime) {
        if (!overlappingBooking) {
          const newBooking = {
            name: name,
            date: bookingDate,
            startTime: startTime,
            endTime: endTime,
            instagram: instagram
          };

          storedBookings.push(newBooking);
          localStorage.setItem("bookings", JSON.stringify(storedBookings));

          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <strong>Nombre:</strong> ${name}<br>
            <strong>Fecha de reserva:</strong> ${bookingDate}<br>
            <strong>Hora de inicio:</strong> ${startTime}<br>
            <strong>Hora de finalización:</strong> ${endTime}<br>
          `;
          bookingList.appendChild(listItem);
        } else {
          alert("La fecha y hora seleccionadas ya están reservadas o se solapan con otra reserva en el mismo día. Espabila campeón");
        }
      } else {
        alert("Mandril, ingresa todos los campos requeridos.");
      }
    });
  });
  const dynamicText = document.querySelector(".typing-title span");
const words = ["Jorge a.k.a lodz.cutzZ!", "un maestro de los fades", "el rey de las tijeras"];
// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");
    
    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 90);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();


  
  