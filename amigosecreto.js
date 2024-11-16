// const nameInput = document.getElementById("nameInput");
// const phoneInput = document.getElementById("phoneInput");
// const addNameButton = document.getElementById("addNameButton");
// const nameList = document.getElementById("nameList");
// const generatePairsButton = document.getElementById("generatePairsButton");
// const pairsList = document.getElementById("pairsList");

// let participants = [];

// // Agregar nombres y teléfonos al array y lista
// addNameButton.addEventListener("click", () => {
//   const name = nameInput.value.trim();
//   const phone = phoneInput.value.trim();

//   if (name && phone && !participants.some(p => p.phone === phone)) {
//     participants.push({ name, phone });
//     const listItem = document.createElement("li");
//     listItem.textContent = `${name} (${phone})`;
//     nameList.appendChild(listItem);

//     nameInput.value = "";
//     phoneInput.value = "";
//   } else {
//     alert("Por favor, ingresa un nombre y teléfono válidos o verifica que no esté repetido.");
//   }

//   generatePairsButton.disabled = participants.length < 2;
// });

// // Generar parejas aleatorias y enviar mensajes de texto
// generatePairsButton.addEventListener("click", () => {
//   if (participants.length < 2) return alert("Necesitas al menos 2 participantes.");

//   const shuffled = [...participants].sort(() => Math.random() - 0.5);
//   const pairs = shuffled.map((participant, i) => {
//     const receiver = i === shuffled.length - 1 ? shuffled[0] : shuffled[i + 1];
//     return { giver: participant, receiver: receiver };
//   });

//   // Mostrar mensajes en la consola y preparar contenido del archivo
//   pairsList.innerHTML = "";
//   let txtContent = "Parejas de Amigo Secreto:\n";

//   pairs.forEach(pair => {
//     const listItem = document.createElement("li");
//     listItem.textContent = `${pair.giver.name} → (Mensaje enviado a ${pair.giver.phone})`;
//     pairsList.appendChild(listItem);

//     // Agregar pareja al contenido del archivo
//     txtContent += `${pair.giver.name} tiene como amigo secreto a ${pair.receiver.name}\n`;

//     // Aquí se haría el envío del mensaje real
//   //  sendSMS(pair.giver.phone, `Hola ${pair.giver.name}, tu amigo secreto es ${pair.receiver.name}. ¡No se lo digas a nadie!`);
//   });

//   // Generar y descargar archivo txt
//   downloadTxtFile(txtContent);
// });

// // Función para enviar mensajes de texto usando Twilio
// // function sendSMS(phone, message) {
    
  
// //     fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
// //       method: "POST",
// //       headers: {
// //         "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`),
// //         "Content-Type": "application/x-www-form-urlencoded",
// //       },
// //       body: new URLSearchParams({
// //         From: fromNumber,
// //         To: phone,
// //         Body: message,
// //       }),
// //     })
// //       .then(response => {
// //         if (!response.ok) {
// //           console.error(`Error al enviar a ${phone}:`, response.statusText);
// //           throw new Error("Error enviando SMS");
// //         }
// //         console.log(`Mensaje enviado a ${phone}`);
// //       })
// //       .catch(error => console.error(`Error al enviar a ${phone}:`, error));
// //   }
  

// // Función para generar y descargar el archivo .txt
// function downloadTxtFile(content) {
//   const blob = new Blob([content], { type: "text/plain" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "amigo_secreto.txt";
//   link.click();
// }

const nameInput = document.getElementById("nameInput");
const addNameButton = document.getElementById("addNameButton");
const nameList = document.getElementById("nameList");
const generatePairsButton = document.getElementById("generatePairsButton");
const pairsList = document.getElementById("pairsList");

let participants = [];

// Agregar nombres al array y lista
addNameButton.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name && !participants.includes(name)) {
    participants.push(name);
    const listItem = document.createElement("li");
    listItem.textContent = name;
    nameList.appendChild(listItem);
    nameInput.value = "";
  }

  generatePairsButton.disabled = participants.length < 2;
});

// Generar parejas aleatorias y descargar TXT
generatePairsButton.addEventListener("click", () => {
  if (participants.length < 2) return alert("Necesitas al menos 2 participantes.");

  // Copia y mezcla la lista de participantes
  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  
  // Generar parejas
  const pairs = shuffled.map((name, i) => {
    const receiver = i === shuffled.length - 1 ? shuffled[0] : shuffled[i + 1];
    return `${name} → ${receiver}`;
  });

  // Mostrar parejas en la lista
  pairsList.innerHTML = "";
  pairs.forEach(pair => {
    const pairItem = document.createElement("li");
    pairItem.textContent = pair;
    pairsList.appendChild(pairItem);
  });

  // Crear el archivo TXT
  const textContent = pairs.join("\n");
  const blob = new Blob([textContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "amigo_secreto.txt";
  link.textContent = "Descargar Amigo Secreto (TXT)";
  link.style.display = "block";

  pairsList.appendChild(link);
});

