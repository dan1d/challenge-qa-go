import { createConsumer } from '@rails/actioncable';

const cable = createConsumer('ws://localhost:3001/cable');  // Adjust the URL to point to your Rails backend

export default cable;
