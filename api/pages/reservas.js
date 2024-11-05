// import nodemailer from 'nodemailer';

// // Configuração do transporte de e-mail
// const transporter = nodemailer.createTransport({
//   host: 'smtp.zoho.com', // Servidor SMTP da Zoho
//   port: 465, // Porta para SSL
//   secure: true, // true para 465
//   auth: {
//     user: 'contato@estevamsouza.com.br', // Seu e-mail
//     pass: '0Q4xjGxjQB03', // Sua senha de aplicativo
//   },
// });

// // Função para determinar a saudação com base no horário
// function getGreetingMessage() {
//   const now = new Date();
//   const hours = now.getHours();
//   const day = now.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado

//   let greeting = '';

//   if (day === 5) { // Sexta-feira
//     greeting = 'Excelente final de semana!';
//   } else if (day === 6) { // Sábado
//     greeting = 'Bom descanso!';
//   } else if (hours < 12) {
//     greeting = 'Bom dia e um excelente trabalho!';
//   } else if (hours < 18) {
//     greeting = 'Boa tarde!';
//   } else {
//     greeting = 'Bom descanso e uma boa noite!';
//   }

//   return greeting;
// }

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     // Desestruturando os campos recebidos do formulário
//     const { name, telefone, pessoa, reservationDate, reservationTime, mensagem } = req.body;

//     // Validação dos campos
//     if (!name || !telefone || !pessoa || !reservationDate || !reservationTime) {
//       return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
//     }

//     // Saudação com base na hora do dia
//     const greetingMessage = getGreetingMessage();

//     // Configuração do e-mail para o administrador
//     const mailOptionsToAdmin = {
//       from: 'contato@estevamsouza.com.br', // E-mail do remetente
//       to: 'contato@estevamsouza.com.br', // Destinatário
//       subject: `Nova reserva de ${name}`,
//       text: `Você recebeu uma nova reserva:\n\n` +
//             `Nome: ${name}\n` +
//             `Telefone: ${telefone}\n` +
//             `Número de pessoas: ${pessoa}\n` +
//             `Data da reserva: ${reservationDate}\n` +
//             `Horário da reserva: ${reservationTime}\n` +
//             `Mensagem: ${mensagem || 'Sem mensagem adicional'}\n`,
//       html: `<p><strong>Prezado(a),</strong></p>
//              <p>Você recebeu uma nova reserva:</p>
//              <p><strong>Nome:</strong> ${name}</p>
//              <p><strong>Telefone:</strong> ${telefone}</p>
//              <p><strong>Número de pessoas:</strong> ${pessoa}</p>
//              <p><strong>Data da reserva:</strong> ${reservationDate}</p>
//              <p><strong>Horário da reserva:</strong> ${reservationTime}</p>
//              <p><strong>Mensagem:</strong><br>${mensagem || 'Sem mensagem adicional'}</p>`,
//     };

//     // Configuração do e-mail para o cliente
//     const mailOptionsToClient = {
//       from: 'contato@estevamsouza.com.br', // E-mail do remetente
//       to: telefone, // Enviar para o telefone do cliente (ou e-mail, caso seja uma substituição)
//       subject: 'Agradecemos pelo seu pedido de reserva!',
//       text: `Prezado(a) ${name},\n\n` +
//             `${greetingMessage}\n` +
//             `Agradecemos pelo seu pedido de reserva. Confirmamos que sua reserva foi recebida com sucesso!\n\n` +
//             `Confira os detalhes da sua reserva abaixo:\n\n` +
//             `Número de pessoas: ${pessoa}\n` +
//             `Data da reserva: ${reservationDate}\n` +
//             `Horário da reserva: ${reservationTime}\n` +
//             `Mensagem adicional: ${mensagem || 'Sem mensagem adicional'}\n\n` +
//             `Nosso time está ansioso para recebê-lo. Até breve!`,
//       html: `<p>Prezado(a) ${name},</p>
//              <p>${greetingMessage}</p>
//              <p>Agradecemos pelo seu pedido de reserva. Confirmamos que sua reserva foi recebida com sucesso!</p>
//              <p><strong>Detalhes da reserva:</strong></p>
//              <p><strong>Número de pessoas:</strong> ${pessoa}</p>
//              <p><strong>Data da reserva:</strong> ${reservationDate}</p>
//              <p><strong>Horário da reserva:</strong> ${reservationTime}</p>
//              <p><strong>Mensagem adicional:</strong><br>${mensagem || 'Sem mensagem adicional'}</p>
//              <p>Nosso time está ansioso para recebê-lo. Até breve!</p>`,
//     };

//     // Enviar os e-mails
//     try {
//       await transporter.sendMail(mailOptionsToAdmin);
//       await transporter.sendMail(mailOptionsToClient);
//       return res.status(200).json({ message: 'E-mails enviados com sucesso!' });
//     } catch (error) {
//       console.error('Erro ao enviar os e-mails:', error);
//       return res.status(500).json({ error: 'Erro ao enviar os e-mails. Tente novamente mais tarde.' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).json({ error: `Método ${req.method} não permitido.` });
//   }
// }

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com', // Servidor SMTP da Zoho
  port: 465, // Porta para SSL
  secure: true, // true para 465
  auth: {
    user: 'contato@estevamsouza.com.br', // Seu e-mail
    pass: '0Q4xjGxjQB03', // Sua senha de aplicativo
  },
});

// Função de saudação
function getGreetingMessage() {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay();

  let greeting = '';
  
  if (day === 5) greeting = 'Excelente final de semana!';
  else if (day === 6) greeting = 'Bom descanso!';
  else if (hours < 12) greeting = 'Bom dia!';
  else if (hours < 18) greeting = 'Boa tarde!';
  else greeting = 'Boa noite!';

  return greeting;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstname, phone, guests, reservation_date, reservation_time, message } = req.body;

    // Validação
    if (!firstname || !phone || !guests || !reservation_date || !reservation_time) {
      return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    // Configuração do e-mail para o administrador
    const mailOptionsToAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nova reserva de ${firstname}`,
      text: `Nome: ${firstname}\nTelefone: ${phone}\nPessoas: ${guests}\nData: ${reservation_date}\nHora: ${reservation_time}\nMensagem: ${message}`,
      html: `<p><strong>Nome:</strong> ${firstname}</p><p><strong>Telefone:</strong> ${phone}</p><p><strong>Pessoas:</strong> ${guests}</p><p><strong>Data:</strong> ${reservation_date}</p><p><strong>Hora:</strong> ${reservation_time}</p><p><strong>Mensagem:</strong><br>${message}</p>`,
    };

    // Configuração do e-mail para o cliente
    const greetingMessage = getGreetingMessage();
    const mailOptionsToClient = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Confirmação de reserva',
      text: `Prezado(a) ${firstname},\n\n${greetingMessage}\nConfirmamos sua reserva para ${guests} pessoa(s) no dia ${reservation_date} às ${reservation_time}.`,
      html: `<p>Prezado(a) ${firstname},</p><p>${greetingMessage}</p><p>Confirmamos sua reserva para ${guests} pessoa(s) no dia ${reservation_date} às ${reservation_time}.</p>`,
    };

    try {
      await transporter.sendMail(mailOptionsToAdmin);
      await transporter.sendMail(mailOptionsToClient);
      return res.status(200).json({ message: 'Reserva confirmada e e-mails enviados com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar os e-mails:', error);
      return res.status(500).json({ error: 'Erro ao enviar os e-mails. Tente novamente mais tarde.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Método ${req.method} não permitido.` });
  }
}



