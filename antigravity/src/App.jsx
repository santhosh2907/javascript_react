import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Counter from './projects/1-Counter/Counter';
import Stopwatch from './projects/2-Stopwatch/Stopwatch';
import TodoList from './projects/3-TodoList/TodoList';
import DigitalClock from './projects/4-DigitalClock/DigitalClock';
import Calculator from './projects/5-Calculator/Calculator';
import WeatherApp from './projects/6-WeatherApp/WeatherApp';
import InfiniteScrolling from './projects/7-InfiniteScrolling/InfiniteScrolling';
import ThemeSwitcher from './projects/8-ThemeSwitcher/ThemeSwitcher';
import FormValidation from './projects/9-FormValidation/FormValidation';
import ImageSlider from './projects/10-ImageSlider/ImageSlider';
import SearchFilter from './projects/11-SearchFilter/SearchFilter';
import NavigationDemo from './projects/12-RouterNavigation/NavigationDemo';
import Accordion from './projects/13-Accordion/Accordion';
import ModalPopup from './projects/14-ModalPopup/ModalPopup';
import ReduxToolkitWrapper from './projects/15-ReduxToolkit/ReduxToolkit';
import ReactQueryDemo from './projects/16-ReactQuery/ReactQueryDemo';
import TicTacToe from './projects/17-TicTacToe/TicTacToe';
import DragAndDrop from './projects/18-DragAndDrop/DragAndDrop';
import SidebarNavigation from './projects/19-SidebarNavigation/SidebarNavigation';
import PasswordGenerator from './projects/20-PasswordGenerator/PasswordGenerator';
import ShoppingCart from './projects/21-ShoppingCart/ShoppingCart';
import QuizApp from './projects/22-QuizApp/QuizApp';
import ToastNotificationsWrapper from './projects/23-ToastNotifications/ToastNotifications';
import MarkdownPreviewer from './projects/24-MarkdownPreviewer/MarkdownPreviewer';
import RandomQuoteGenerator from './projects/25-RandomQuote/RandomQuoteGenerator';
import UserAuthWrapper from './projects/26-UserAuth/UserAuth';
import TabbedInterface from './projects/27-Tabs/TabbedInterface';
import MultiStepForm from './projects/28-MultiStepForm/MultiStepForm';
import Pagination from './projects/29-Pagination/Pagination';
import AudioPlayer from './projects/30-AudioPlayer/AudioPlayer';
import ContextDemo from './projects/31-ContextAPILocalization/ContextDemo';

const projects = [
  {
    id: 1,
    title: 'Simple Counter',
    description: 'Basics of useState hook',
    path: '/projects/1',
    component: Counter
  },
  {
    id: 2,
    title: 'Stopwatch',
    description: 'Timer with start/stop/lap functionalities',
    path: '/projects/2',
    component: Stopwatch
  },
  {
    id: 3,
    title: 'Todo List',
    description: 'Task management with Local Storage persistence',
    path: '/projects/3',
    component: TodoList
  },
  {
    id: 4,
    title: 'Digital Clock',
    description: 'Real-time digital clock with date',
    path: '/projects/4',
    component: DigitalClock
  },
  {
    id: 5,
    title: 'Calculator',
    description: 'Basic arithmetic calculator',
    path: '/projects/5',
    component: Calculator
  },
  {
    id: 6,
    title: 'Weather App',
    description: 'Real-time weather using Open-Meteo API',
    path: '/projects/6',
    component: WeatherApp
  },
  {
    id: 7,
    title: 'Infinite Scrolling',
    description: 'Dynamic content loading with Intersection Observer',
    path: '/projects/7',
    component: InfiniteScrolling
  },
  {
    id: 8,
    title: 'Dark/Light Mode Theme',
    description: 'Theme switching with React Context and Tailwind',
    path: '/projects/8',
    component: ThemeSwitcher
  },
  {
    id: 9,
    title: 'Form Validation',
    description: 'Manual form validation with regex and state',
    path: '/projects/9',
    component: FormValidation
  },
  {
    id: 10,
    title: 'Image Slider',
    description: 'Carousel with autoplay and navigation controls',
    path: '/projects/10',
    component: ImageSlider
  },
  {
    id: 11,
    title: 'Search Filter',
    description: 'Real-time list filtering',
    path: '/projects/11',
    component: SearchFilter
  },
  {
    id: 12,
    title: 'Router Navigation',
    description: 'Nested routes and programmatic navigation',
    path: '/projects/12/*',
    component: NavigationDemo
  },
  {
    id: 13,
    title: 'Accordion',
    description: 'Collapsible content sections',
    path: '/projects/13',
    component: Accordion
  },
  {
    id: 14,
    title: 'Modal Popup',
    description: 'Overlay content using React Portals',
    path: '/projects/14',
    component: ModalPopup
  },
  {
    id: 15,
    title: 'Redux Toolkit',
    description: 'Global state management setup',
    path: '/projects/15',
    component: ReduxToolkitWrapper
  },
  {
    id: 16,
    title: 'React Query Posts',
    description: 'Data fetching with caching and automatic refetching',
    path: '/projects/16',
    component: ReactQueryDemo
  },
  {
    id: 17,
    title: 'Tic Tac Toe',
    description: 'Game logic with winner calculation',
    path: '/projects/17',
    component: TicTacToe
  },
  {
    id: 18,
    title: 'Drag and Drop',
    description: 'Reorderable list using HTML5 API',
    path: '/projects/18',
    component: DragAndDrop
  },
  {
    id: 19,
    title: 'Sidebar Navigation',
    description: 'Responsive collapsible layout',
    path: '/projects/19',
    component: SidebarNavigation
  },
  {
    id: 20,
    title: 'Password Generator',
    description: 'Customizable random string generator',
    path: '/projects/20',
    component: PasswordGenerator
  },
  {
    id: 21,
    title: 'Shopping Cart',
    description: 'E-commerce cart logic with reducers',
    path: '/projects/21',
    component: ShoppingCart
  },
  {
    id: 22,
    title: 'Quiz App',
    description: 'Timed quiz with score tracking',
    path: '/projects/22',
    component: QuizApp
  },
  {
    id: 23,
    title: 'Toast Notifications',
    description: 'Custom implementation of global toasts',
    path: '/projects/23',
    component: ToastNotificationsWrapper
  },
  {
    id: 24,
    title: 'Markdown Previewer',
    description: 'Live markdown editing and rendering',
    path: '/projects/24',
    component: MarkdownPreviewer
  },
  {
    id: 25,
    title: 'Random Quote Generator',
    description: 'API fetch with dynamic styling',
    path: '/projects/25',
    component: RandomQuoteGenerator
  },
  {
    id: 26,
    title: 'User Authentication',
    description: 'Mock login with protected routes',
    path: '/projects/26',
    component: UserAuthWrapper
  },
  {
    id: 27,
    title: 'Tabbed Interface',
    description: 'Accessible tabs component',
    path: '/projects/27',
    component: TabbedInterface
  },
  {
    id: 28,
    title: 'Multi-Step Form',
    description: 'Wizard form with state management',
    path: '/projects/28',
    component: MultiStepForm
  },
  {
    id: 29,
    title: 'Pagination',
    description: 'Data table with dynamic pages',
    path: '/projects/29',
    component: Pagination
  },
  {
    id: 30,
    title: 'Audio Player',
    description: 'Custom media controls and playlist',
    path: '/projects/30',
    component: AudioPlayer
  },
  {
    id: 31,
    title: 'Context API (Localization)',
    description: 'Learn Context by building a multi-language app',
    path: '/projects/31',
    component: ContextDemo
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">React 30+ Projects</h1>
        <p className="text-gray-600">A journey from beginner to advanced React concepts</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Project {project.id}: {project.title}</h2>
            <p className="text-gray-500 mb-4">{project.description}</p>
            <Link to={project.path} className="text-blue-600 hover:text-blue-800 font-medium">View Project →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {projects.map((project) => (
          <Route key={project.id} path={project.path} element={<project.component />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
