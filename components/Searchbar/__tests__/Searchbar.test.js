import React from 'react';
import Searchbar from '../Searchbar';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

it('should display what user inputs', async () => {
    const container = render(<Searchbar />);

    const input = container.getByLabelText('input')
    expect(input.value).toBe('')

    fireEvent.change(input, { target: { value: 'hello' } })

    expect(input.value).toBe('hello')
})

it('should display value prop', async () => {
    const container = render(<Searchbar value={'my value'} />);
    const input = container.getByLabelText('input')
    expect(input.value).toBe('my value')
})

it('should call onChange prop when user inputs', async () => {
    const onChange = jest.fn();
    const container = render(<Searchbar onChange={onChange} />);

    const input = container.getByLabelText('input')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(onChange).toHaveBeenCalled();
})

it('should call debouncedOnChange prop (with debounce value debounceMs) when user inputs', async () => {
    const debouncedOnChange = jest.fn();
    const container = render(<Searchbar debouncedOnChange={debouncedOnChange} debounceMs={2000} />);

    const input = container.getByLabelText('input')
    fireEvent.change(input, { target: { value: 'hello' } })

    await waitFor(() => expect(debouncedOnChange).not.toHaveBeenCalled());

    await waitFor(() => expect(debouncedOnChange).toHaveBeenCalled(), { interval: 3000, timeout: 5000 });
})

it('should NOT display LoadingSpinner when isLoading prop is false', async () => {
    render(<Searchbar isLoading={false} />);
    expect(screen.queryByTestId('loadingSpinner')).toBeFalsy();
})

it('should display LoadingSpinner when isLoading prop is true', async () => {
    render(<Searchbar isLoading={true} />);
    expect(screen.queryByTestId('loadingSpinner')).toBeTruthy();
})


