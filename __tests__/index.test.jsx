import { render } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
  });
});
