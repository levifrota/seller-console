import NavigationContainer from './NavigationContainer';
import TabNavigation from './TabNavigation';

const Header = ({ className = '' }) => {
  return (
    <header className={`sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </header>
  );
};

export default Header;