// Código para o Editor de Scripts do Google Apps Script

function doPost(e) {
  try {
    // Acessar planilha - substitua pelo ID da sua planilha
    const sheetId = 'YOUR_SHEET_ID';
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Leads');
    
    // Parsear dados JSON
    const data = JSON.parse(e.postData.contents);
    
    // Preparar dados para inserção
    const rowData = [
      new Date(), // Timestamp (servidor)
      data.name,
      data.email,
      data.company,
      data.role,
      data.message,
      'Novo' // Status de contato
    ];
    
    // Inserir dados na planilha
    sheet.appendRow(rowData);
    
    // Enviar email de confirmação para o usuário
    MailApp.sendEmail({
      to: data.email,
      subject: "Bem-vindo à lista de espera da Belga Hub!",
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff4900;">Obrigado por se juntar à Belga Hub!</h2>
          <p>Olá ${data.name},</p>
          <p>Recebemos sua inscrição para participar do beta da Belga Hub, o primeiro marketplace que conecta PMEs brasileiras a softwares e parceiros de implementação.</p>
          <p>Assim que iniciarmos nossa fase beta, você será um dos primeiros a receber acesso.</p>
          <p>Enquanto isso, não deixe de nos seguir nas redes sociais:</p>
          <div style="margin: 20px 0;">
            <a href="https://www.linkedin.com/company/belga-hub/" style="display: inline-block; margin-right: 10px; color: #0077b5;">LinkedIn</a>
            <a href="https://www.instagram.com/belgahub/" style="display: inline-block; margin-right: 10px; color: #e1306c;">Instagram</a>
            <a href="https://www.x.com/belgahub" style="display: inline-block; color: #1da1f2;">Twitter</a>
          </div>
          <p>Atenciosamente,<br>Equipe Belga Hub</p>
        </div>
      `
    });
    
    // Enviar email de notificação para a equipe Belga
    MailApp.sendEmail({
      to: "contato@belgahub.com.br",
      subject: "Novo cadastro no beta da Belga Hub",
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff4900;">Novo cadastro no beta da Belga Hub!</h2>
          <p><strong>Nome:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Empresa:</strong> ${data.company}</p>
          <p><strong>Perfil:</strong> ${data.role}</p>
          <p><strong>Mensagem:</strong> ${data.message || "Não fornecida"}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      `
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput("O endpoint de API está funcionando! Use POST para enviar dados.");
}