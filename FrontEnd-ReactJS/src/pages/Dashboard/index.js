import React, { useState, useMemo } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { Container, Time } from './styles';

export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    const formattedDate = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    );

    function prevDay() {
        setDate(subDays(date, 1));
    }

    function nextDay() {
        setDate(addDays(date, 1));
    }

    return (
        <Container>
            <header>
                <button onClick={prevDay} type="button">
                    <MdChevronLeft size={36} color="#FFF" />
                </button>

                <strong>{formattedDate}</strong>

                <button onClick={nextDay} type="button">
                    <MdChevronRight size={36} color="#FFF" />
                </button>
            </header>

            <ul>
                <Time past>
                    <strong>08:00</strong>
                    <span>Higor Martins</span>
                </Time>
                <Time available>
                    <strong>09:00</strong>
                    <span>Em aberto</span>
                </Time>
                <Time>
                    <strong>10:00</strong>
                    <span>Higor Martins</span>
                </Time>
                <Time>
                    <strong>11:00</strong>
                    <span>Higor Martins</span>
                </Time>
            </ul>
        </Container>
    );
}
