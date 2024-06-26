import {
  AddTicket,
  Button,
  DivContainer,
  Text,
  TicketCard,
} from '../../components';
import {
  StyledNav,
  StyledSection,
  StyledHeader,
  StyledSpan,
  StyledFooterText,
  StyledDisplayMobile,
} from './profile.tickets.styled';
import InfoIcon from '../../assets/info-button1.png';
import { useState } from 'react';
import { useTicketsContext } from '../../context/context';
import { TicketServices } from '../../services/ticket.service/ticket.service';

export const ProfileTickets = () => {
  const { totalPrice, allTickets } = useTicketsContext();

  const [ticketCards, setTicketCards] = useState<number[]>([]);

  const handleSubmit = async () => {
    await TicketServices.registerTickets(allTickets);
    // etapa 2: limpar tickets do front
    // etapa 3: atualizar saldos
    // ....
  };
  return (
    <StyledSection>
      <StyledHeader>
        <StyledNav $border='2px solid #104788' color='#177FE9'>
          BILHETES
          <StyledSpan>{ticketCards.length}</StyledSpan>
        </StyledNav>
        <StyledNav color='#A7AACD'>RESULTADOS</StyledNav>
      </StyledHeader>
      <StyledDisplayMobile>
        <DivContainer
          display='flex'
          alignitems='start'
          justifycontent='center'
          flexdirection='column'
          padding='10px 27px'
        >
          <AddTicket
            onClick={() =>
              setTicketCards((oldList) => [...oldList, oldList.length + 1])
            }
          />
        </DivContainer>
        {ticketCards.map((_, index) => {
          return (
            <DivContainer
              display='flex'
              flexdirection='column'
              alignitems='start'
              justifycontent='center'
              padding='10px 27px'
              key={index}
            >
              <TicketCard index={index} />
            </DivContainer>
          );
        })}
      </StyledDisplayMobile>
      <DivContainer
        display='flex'
        gap='5px'
        padding='5px 27px'
        alignitems='center'
      >
        <Text color='#A7AACD' fontWeight='bold' fontSize='12px'>
          {'VALOR TOTAL: '}
        </Text>
        <Text color='#177FE9' fontWeight='bold' fontSize='12px'>
          {totalPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Text>
      </DivContainer>
      <DivContainer
        display='flex'
        alignitems='center'
        flexdirection='column'
        padding='20px'
      >
        <Button
          border='none'
          background='#2546F4'
          color='#ffffff'
          width='259px'
          height='65px'
          borderradius='10px'
          fontSize='18px'
          fontWeight='bold'
          transition='background-color 0.3s'
          hover='#14132d'
          onClick={() => {
            console.log('allTickets', allTickets);
            handleSubmit();
          }}
        >
          COMPRAR BILHETES
        </Button>
      </DivContainer>
      <DivContainer display='flex' padding='10px 27px' alignitems='center'>
        <StyledFooterText>
          <img height={'15px'} width={'15px'} src={InfoIcon}></img>
          VALORES BILHETES: 15 NÚMEROS - R$ 3,00 | 16 NÚMEROS - R$ 100,00 | 17
          NÚMEROS - R$ 300,00 | 18 NÚMEROS - R$ 5.000,00 | 19 NÚMEROS - R$
          15.000,00 | 20 NÚMEROS - R$ 25.000,00
        </StyledFooterText>
      </DivContainer>
    </StyledSection>
  );
};
