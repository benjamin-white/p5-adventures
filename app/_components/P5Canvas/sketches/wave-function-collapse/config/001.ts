import tile001 from '../img/001/tile0.png';
import tile002 from '../img/001-alt/tile1.png';
import tile003 from '../img/001/tile2.png';
import tile004 from '../img/001/tile3.png';
import tile005 from '../img/001-alt/tile4.png';
import tile006 from '../img/001/tile5.png';
import tile007 from '../img/001/tile6.png';

const sketchParams = {
  DIMENSION: 16,
  TILES: {
    SOURCE: [
      tile001.src,
      tile002.src,
      tile003.src,
      tile004.src,
      tile005.src,
      tile006.src,
      tile007.src,
    ],
    SOCKET_RULES: [
      ['AAA', 'AAA', 'AAA', 'AAA'],
      ['ABA', 'ABA', 'ABA', 'AAA'],
      ['BAA', 'AAB', 'AAA', 'AAA'],
      ['BAA', 'AAA', 'AAB', 'BBB'],
      ['ABA', 'ABA', 'AAA', 'AAA'],
      ['ABA', 'AAA', 'ABA', 'AAA'],
      ['ABA', 'ABA', 'ABA', 'ABA'],
    ],
  },
};

export default sketchParams;
