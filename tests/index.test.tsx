import { render } from '@testing-library/react';
import Home from '../src/app/page';

jest.mock('next/navigation', () => ({
  useRouter: () => jest.fn()
}));

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
  });
});
