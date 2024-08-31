# Requisitos Necessários

 - Visual Studio Code
 - PHP & Composer

# Este repositório utiliza uma API em PHP com créditos ao CyberRoot.

# Começando

# Instalar Dependências
 Navegue até o diretório raiz e instale as dependências:

   npm install

# Iniciar o App Expo

 Execute o app com:

   npx expo start

# Você encontrará opções para abrir o app em:

 - Emulador Android
 - Simulador iOS
 - WEB

 # Executar a API PHP

 1. Navegue até o diretório SIGA-API-MAIN e instale as dependências:

   composer install

 2. Entre na pasta public e inicie o servidor PHP:
   php -S localhost:8080 index.php
3. Após iniciar o servidor, atualize as rotas na sua aplicação (telas) para apontar para o novo endereço.

# Aproveite o app!

# Observações

Este projeto tem como objetivo recriar o sistema SIGA da FATEC em uma versão mobile para fornecer uma interface
 mais limpa para acessar informações simples, como notas e faltas. A API utilizada foi desenvolvida pelo CyberRoot
 com PHP e Crawler, e é consumida usando React Native e TypeScript.
