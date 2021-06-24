export type Colors = {
  [color: string]: string | {}
}

export type Fonts = {
  [font: string]: string
}

export type Theme = {
  colors: Colors,
  fonts: Fonts
}

const theme: Theme = {
  colors: {
    primary: '#0cc665',
    secondary: '#00A2FF',
    gray: '#DEDEDE',
    black: '#000000',
    states: {
      error: '#FF4A44',
      success: '#65D543',
      alert: '#FFDF41',
    }
  },
  fonts: {
    black: '\'Flexo-black\', sans-serif',
    bold: '\'Flexo-bold\', sans-serif',
    medium: '\'Flexo-medium\', sans-serif',
    regular: '\'Flexo-regular\', sans-serif',
    thin: '\'Flexo-thin\', sans-serif',
  },
};

export default theme;
