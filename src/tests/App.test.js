import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';

describe('testa <App />', () => {

    test('testa input Name', async () => {
        render(<App />)
        const inputName = screen.getByRole('textbox');

        expect(inputName).toBeInTheDocument();
    
        const alderaanName = await screen.findByRole('cell', {  name: /alderaan/i});

        expect(alderaanName).toBeInTheDocument();

        userEvent.type(inputName, 'tato')

        expect(alderaanName).not.toBeInTheDocument();

        const tatoName = await screen.findByRole('cell', { name: /tatooine/i });

        expect(tatoName).toBeInTheDocument();
    })

    test('testa se ordena a lista de planetas', async () => {
        render(<App />)
        const alderaanName = await screen.findByRole('cell', {  name: /alderaan/i});
        expect(alderaanName).toBeInTheDocument();

        const selectInput = screen.getByTestId('column-sort');
        const askRadio = screen.getByRole('radio', {  name: /asc/i})
        const orderButton = screen.getByRole('button', {  name: /submeter/i})

        expect(selectInput).toBeInTheDocument()
        expect(askRadio).toBeInTheDocument()
        expect(orderButton).toBeInTheDocument()

        userEvent.selectOptions(selectInput, 'rotation_period')
        userEvent.click(askRadio);
        userEvent.click(orderButton);
    })

    test('testa se multipos filtros funciona', async () => {
        render(<App />)
        const alderaanName = await screen.findByRole('cell', {  name: /alderaan/i});
        expect(alderaanName).toBeInTheDocument();
    
        const selectInput = screen.getByTestId('column-filter');
        expect(selectInput).toBeInTheDocument()
        userEvent.selectOptions(selectInput, 'diameter')
    
        const selectComparisor = screen.getByTestId('comparison-filter')
        expect(selectComparisor).toBeInTheDocument();
        userEvent.selectOptions(selectComparisor, 'menor que')
    
        const inputNumber = screen.getByRole('spinbutton')
        expect(inputNumber).toBeInTheDocument();
        userEvent.type(inputNumber, '8000')
    
        const buttonFilter = screen.getByRole('button', {  name: /adicionar filtro/i})
        expect(buttonFilter).toBeInTheDocument();
        userEvent.click(buttonFilter)
    
        const hothName = await screen.findByRole('cell', { name: /Hoth/i });
        expect(hothName).toBeInTheDocument();
    
        userEvent.selectOptions(selectInput, 'orbital_period')
        userEvent.selectOptions(selectComparisor, 'maior que');
        userEvent.clear(inputNumber)
        userEvent.type(inputNumber, '400')
        userEvent.click(buttonFilter)
    
        const endorPlanet = await screen.findByRole('cell', { name: /endor/i });
        expect(endorPlanet).toBeInTheDocument();
        expect(hothName).toBeInTheDocument();
    
        userEvent.selectOptions(selectInput, 'surface_water')
        userEvent.selectOptions(selectComparisor, 'igual a');
        userEvent.clear(inputNumber)
        userEvent.type(inputNumber, '100')
        userEvent.click(buttonFilter)

        expect(hothName).toBeInTheDocument();
        expect(endorPlanet).not.toBeInTheDocument();

    })

    test('testa se colocar o filtro decrescente funciona', async () => {
        render(<App />)
        const alderaanName = await screen.findByRole('cell', {  name: /alderaan/i});
        expect(alderaanName).toBeInTheDocument();
    
        const selectInput = screen.getByTestId('column-sort');
        const descRadio = screen.getByTestId('column-sort-input-desc')
        const buttonOrder = screen.getByTestId('column-sort-button')
    
        expect(selectInput).toBeInTheDocument()
        expect(descRadio).toBeInTheDocument()
        expect(buttonOrder).toBeInTheDocument()
    
        userEvent.selectOptions(selectInput, 'rotation_period')
        userEvent.click(descRadio);
        userEvent.click(buttonOrder);
    
        const getPlanets = await screen.findAllByTestId('planet-name');
        expect(getPlanets[0]).toContainHTML('Kamino')
        expect(getPlanets[9]).toContainHTML('Bespin')
    })
});
