import Searchbar from '../Searchbar';
import { render, fireEvent, waitFor } from '@testing-library/react'

test('Searchbar displays what user inputs', async () => {
    const container = render(<Searchbar />);

    const input = container.getByLabelText('input')
    expect(input.value).toBe('')

    fireEvent.change(input, { target: { value: 'hello' } })

    expect(input.value).toBe('hello')
})

test('Searchbar displays value prop', async () => {
    const container = render(<Searchbar value={'passed in value'} />);

    const input = container.getByLabelText('input')
    expect(input.value).toBe('passed in value')
})

test('onChange prop gets called when user inputs', async () => {
    const onChange = jest.fn();
    const container = render(<Searchbar onChange={onChange} />);

    const input = container.getByLabelText('input')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect(onChange).toHaveBeenCalled();
})

test('onChange prop gets called when user inputs (with throttling)', async () => {
    const onChange = jest.fn();
    const container = render(<Searchbar onChange={onChange} debounceMs={2000} />);

    const input = container.getByLabelText('input')
    fireEvent.change(input, { target: { value: 'hello' } })

    await waitFor(() => expect(onChange).not.toHaveBeenCalled());

    await waitFor(() => expect(onChange).toHaveBeenCalled(), { interval: 3000, timeout: 5000 });
})
