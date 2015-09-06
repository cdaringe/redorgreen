import React from 'react'
import Rainbow from 'color-rainbow';
var myRainbow = new Rainbow(6);
let footer;

/**
 * @class Zia
 * designed to live in the #footer element
 * because of complex scaling, the zia is scaled
 * on resize to fit within the footer
 */
export default class Zia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setSvgSize();
        let crazyColorIntvl;
        window.addEventListener('resize', this.setSvgSize.bind(this));
        let z = this.refs.zia.getDOMNode();
        z.addEventListener('mouseenter', (evt) => {
            crazyColorIntvl = setInterval(function() {
                z.style.backgroundColor = myRainbow.next().hexString();
            }, 255);
        });
        z.addEventListener('mouseleave', () => {
            z.style.backgroundColor = '';
            clearInterval(crazyColorIntvl);
        });
    }

    setSvgSize() {
        let footer = document.querySelector('#footer');
        if (!footer) {
            setTimeout(() => {
                this.setSvgSize();
            }.bind(this), 50);
            return;
        }
        this.setState({
            footerHeight: footer.getBoundingClientRect().height
        });
    }

    render() {
        let ziaWidth;
        if (this.state.footerHeight) {
            ziaWidth = this.state.footerHeight*0.9;
        }
        return (
            <svg
                ref="zia" id="zia"
                onClick={() => this.props.setStatsUp(true)}
                height={(ziaWidth || '80') + 'px'}
                width={(ziaWidth || '80') + 'px'}
                viewBox="0 0 802.05483 803.87828">
              <g>
                <path
                        fill={'#00f4ff'}
                        fillOpacity={1}
                        stroke={'#00a5ff'}
                        strokeWidth={8}
                        strokeLinecap={'round'}
                        strokeMiterlimit={5}
                   d="m 367.80104,796.32407 c -7.26582,-4.93728 -6.74298,5.55747 -6.74298,-135.35026 0,-139.45261 0.51238,-128.56043 -6.16483,-131.05279 -1.83434,-0.6847 -5.45586,-2.17422 -8.04782,-3.31004 -8.41299,-3.68668 -7.72403,-12.04062 -8.02277,97.27904 -0.26362,96.46411 -0.2722,96.82688 -2.35653,99.63965 -3.70642,5.00176 -8.40805,7.55938 -12.90805,7.02183 -2.2,-0.26281 -4.86132,-0.56116 -5.91404,-0.99038 -2.9242,-1.06976 -5.91844,-5.45639 -5.91844,-5.45639 l -2.16752,-4.60512 -0.27184,-108.01884 c -0.25005,-99.35906 -0.40601,-108.16709 -1.94537,-109.86807 -1.58893,-1.75575 -1.36205,-2.16072 4.48797,-8.01074 l 6.1615,-6.1615 2.34832,2.20613 c 3.05832,3.00337 5.57654,5.12011 9.28128,7.56915 3.61478,1.9 20.94344,13.07584 37.43814,18.69995 18.94132,4.78967 31.04811,7.10031 51.5,4.0767 8.34952,-1.32258 23.84967,-6.26506 31.5,-10.04431 13.15399,-5.69478 22.16891,-12.87395 25.18297,-15.24028 l 3.97079,-3.14491 6.44042,6.38317 6.44043,6.38318 -0.26731,108.05607 c -0.24975,100.96196 -0.38219,108.23139 -2.0173,110.72655 -1.00397,2.19684 -2.84488,3.90202 -5.97583,5.73712 -6.35751,3.87618 -14.42326,1.54365 -18.72376,-5.4147 -2.02976,-3.28421 -2.05041,-4.27999 -2.05041,-98.86781 0,-52.55259 -0.27314,-96.26198 -0.60699,-97.13196 -0.33384,-0.86999 -1.34634,-1.58396 -2.25,-1.58661 -2.0085,-0.006 -16.15901,4.97335 -17.89301,6.29614 -0.98838,0.75399 -1.25,27.41074 -1.25,127.36324 0,138.2552 0.36461,129.9119 -5.93634,135.83954 -2.5986,2.44464 -4.04343,2.99518 -7.87316,3 -2.57978,0.003 -5.75935,-0.37981 -7.06573,-0.85123 -1.80679,-0.65201 -2.18862,-0.5552 -1.59549,0.4045 0.51061,0.82619 0.37563,1.01189 -0.39108,0.53804 -0.64395,-0.39798 -0.9491,-1.08237 -0.67809,-1.52086 0.52523,-0.84985 -3.34137,-4.79361 -4.14843,-4.23122 -0.26309,0.18334 -0.77835,-10e-4 -1.14501,-0.41032 -0.36667,-0.40901 -0.10417,-0.41996 0.58333,-0.0243 0.6875,0.39564 1.25,0.4382 1.25,0.0946 0,-0.34362 -0.5625,-1.60768 -1.25,-2.80902 -2.50362,-90.89208 -1.80934,-141.46002 -2.25,-251.18429 l -8.98247,-0.29232 c -7.58485,-0.24684 -9.17969,-0.0226 -10.25,1.44113 -1.00641,1.37634 -1.27657,26.87867 -1.31142,123.79232 -0.0373,103.6812 -0.26087,122.66113 -1.48495,126.05887 -1.34693,3.55167 -2.48413,4.48567 -5.94068,7.03501 -5.41323,3.17236 -10.05463,3.15237 -14.7875,-0.0637 z M 495.4866,493.5975 c -1.62451,-1.78463 -4.18108,-4.61478 -5.68126,-6.28922 l -2.72759,-3.04444 5.49016,-6.61432 c 5.45787,-7.67269 6.58716,-7.85948 11.14449,-15.7968 6.24906,-7.99746 6.91336,-13.0697 9.09553,-18.5 5.89912,-17.64407 7.80654,-28.24624 7.64615,-42.5 -0.0896,-7.95897 -1.84836,-23.25417 -3.21972,-28 -4.06241,-14.05867 -5.74082,-18.29277 -11.2005,-28.2553 -6.31447,-9.94615 -13.30278,-19.58675 -14.08673,-20.58697 l -2.11093,-2.65773 6.40828,-5.77711 6.40828,-5.77711 105.16015,0.0404 c 57.83808,0.0222 107.19926,0.3199 109.69151,0.6615 3.03438,0.41591 5.73276,1.65961 8.16797,3.76468 3.10012,2.67985 3.71001,3.90767 4.13427,8.32306 0.38253,3.98101 -0.20111,6.22589 -1.33459,9.2123 -1.1507,2.60572 -2.2116,4.3047 -5.41401,5.55226 -1.09077,1.3143 -13.26941,1.5019 -98.37244,1.51531 -54.03138,0.009 -97.74294,0.40503 -98.51447,0.89364 -1.58529,1.00395 -1.28514,2.89942 1.83545,11.59105 3.79782,10.57786 -11.22607,9.49978 132.41224,9.50155 118.09448,0.001 126.36117,0.11307 129.61929,1.75 10.38413,5.21717 10.83268,20.7877 0.73686,25.57849 -3.22816,1.53188 -13.70443,1.66998 -126.6838,1.66998 -77.19297,0 -123.83743,0.36008 -124.96717,0.9647 -1.50355,0.80467 -1.82173,2.37139 -1.91813,9.4447 -0.088,6.45412 0.25599,8.85157 1.43973,10.0353 1.38983,1.38983 14.44758,1.55647 122.73387,1.56631 66.64821,0.006 122.85762,0.28856 124.9098,0.62779 2.09636,0.34654 5.38255,2.04392 7.5,3.87391 3.55975,3.07647 3.76877,6.0824 3.76877,11.6222 0.25209,6.82966 -4.29159,10.36987 -4.29159,10.36987 l -4.07497,2.49522 -127.45593,0 c -144.73207,0 -130.07622,-0.99024 -133.20232,9 -0.94657,3.025 -2.11572,5.9275 -2.59811,6.45 -1.50224,1.62714 -0.96438,4.43291 1.05718,5.51482 1.29433,0.6927 33.3083,1.03518 96.7656,1.03518 90.37686,0 94.99502,0.087 98.31574,1.85161 1.91642,1.01839 4.4969,3.33493 5.7344,5.14788 4.0364,5.91337 2.35697,15.67273 -3.36357,19.54611 -77.48895,4.19474 -114.31858,2.46476 -221.22604,2.9544 l -2.38909,2.24478 -2.38909,2.24478 z m -306.42854,-1.74478 -108.499996,-0.5 -3.589286,-2.09432 c -1.382056,-0.82203 -2.982856,-3.90964 -3.866084,-6.00365 -1.103,-3.05656 -0.7905,-9.22069 0.3125,-12.27725 1.949747,-3.38126 2.463631,-3.68341 4.200928,-5.44199 l 3.941942,-2.18278 96.999996,-0.51716 c 53.35,-0.28444 97.1125,-0.62194 97.25,-0.75 1.37445,-1.2801 -4.13941,-17.98115 -6.59735,-19.98284 -1.21114,-0.98633 -28.54751,-1.23517 -129.59378,-1.17971 -78.911607,0.0433 -122.603793,0.69169 -124.630295,0.85758 -4.900471,-0.74537 -7.7432594,-5.32668 -9.4224104,-8.56357 -3.27739,-6.28411 -1.237478,-14.28003 4.7287504,-18.53547 l 3.265089,-2.32884 123.999996,-0.5 c 68.2,-0.275 124.5625,-0.86406 125.25,-1.30902 0.8546,-0.55311 1.25,-3.79535 1.25,-10.25 0,-5.19254 -0.1125,-9.54744 -0.25,-9.67757 -0.1375,-0.13012 -56.725,-0.46762 -125.75,-0.75 L 12.558064,389.35272 9.5580636,387.21264 c -1.65,-1.17704 -3.375,-2.15204 -3.833333,-2.16667 -0.458334,-0.0146 -1.133334,-0.36123 -1.5,-0.77024 -0.366667,-0.40901 -0.02769,-0.37269 0.753272,0.0807 1.121463,0.65108 1.231616,0.42203 0.524033,-1.08968 -1.158562,-2.47519 -1.158562,-12.35289 0,-14.82808 0.707583,-1.51171 0.59743,-1.74076 -0.524033,-1.08968 -0.842013,0.48885 -1.080766,0.45386 -0.586606,-0.086 0.458334,-0.50068 1.133334,-0.91103 1.5,-0.91188 0.366667,-8e-4 2.241667,-1.1258 4.1666674,-2.49994 l 3.5,-2.49845 127.700196,-0.5 c 83.14146,-0.32553 128.04366,-0.84893 128.68452,-1.5 0.54138,-0.55 2.0757,-3.925 3.40959,-7.5 1.33389,-3.575 2.73923,-7.22948 3.12298,-8.12106 0.4154,-0.9651 0.0386,-2.28021 -0.93121,-3.25 -1.4828,-1.4828 -10.30675,-1.62894 -98.35456,-1.62894 l -96.725616,0 -3.78094,-3.87203 c -6.48156,-6.63772 -5.97489,-16.4707 1.12789,-21.88901 l 3.59046,-2.73896 108.723786,-0.5 c 106.95662,-0.49187 108.75969,-0.5325 110.93307,-2.49977 l 2.20929,-1.99977 5.39527,5.7964 c 2.9674,3.18801 5.39527,6.20205 5.39527,6.69785 0,0.4958 -2.25,3.60511 -5,6.90957 -7.52829,9.88127 -14.30266,15.23443 -21.53091,38.09572 -1.42706,4.675 -3.00505,9.625 -3.50664,11 -2.71915,7.454 -3.71427,30.31222 -1.90148,43.67764 1.57572,11.6176 6.37804,27.72007 10.34731,34.69522 1.29172,2.26993 3.78886,6.80718 5.54921,10.08278 3.42285,6.36915 9.7484,13.44686 11.82714,15.09307 1.71851,1.43474 -8.2045,11.85616 -10.28463,13.48683 -1.73718,1.27202 -16.25791,1.39876 -110.5,0.96446 z M 475.02831,307.57264 c -9.09222,-7.51059 -25.70024,-16.21973 -39.97025,-20.96015 -22.35542,-7.42634 -46.47415,-7.27605 -69.5,0.43308 -12.48042,4.17849 -14.19372,5.23817 -15.91589,6.07295 -2.92106,1.26531 -8.04813,4.41121 -8.91597,4.81442 -4.84451,2.8611 -9.42334,4.74966 -10.94959,7.00024 -5.69372,8.37027 -4.5371,3.30258 -6.28161,5.02158 -0.41493,0.67137 -3.3689,-1.56517 -7.55902,-5.72318 l -6.87792,-6.82522 0.006,-105.02682 c 0.004,-72.68623 0.3413,-106.258533 1.09585,-109.026823 3.52544,-12.93415 19.27741,-15.63782 26.21764,-4.5 l 2.18093,3.5 0.5,97.000003 0.5,97 3,-0.10941 c 3.95239,-0.14415 14.53686,-4.08295 16.73875,-6.22899 1.63115,-1.58979 1.75491,-9.65464 2,-130.33272 0.15541,-76.523643 -0.41769,-123.991913 -0.42005,-126.248603 0.0644,-1.36991 1.96044,-4.0842296 3.48279,-5.2865896 5.80085,-5.69781 17.49068,-5.59945 22.9682,2.0796096 l 2.22989,3.12671 0.5,124.786663 c 0.43862,109.46711 0.68415,124.90305 2,125.73468 2.20478,1.39346 16.36124,1.21741 17.8,-0.22135 0.92023,-0.92023 1.2,-29.67795 1.2,-123.35078 0,-88.684733 0.31192,-123.082063 1.13852,-125.549993 3.01083,-8.9892696 12.57865,-13.2162596 21.27552,-9.3993796 2.41606,1.26601 2.7607,2.24264 4.58756,4.50016 l 2.4984,3.4999996 0.5,128.166853 c 0.275,70.49178 0.78273,128.44951 1.1283,128.79497 0.60363,0.60344 12.34493,5.14509 16.27124,6.29387 4.67806,1.36873 4.60046,3.04396 4.60046,-99.31822 l 0,-96.180263 2.73985,-3.59268 c 2.4915,-2.7594 5.38945,-4.78286 9.36858,-5.37405 5.68425,-0.63976 10.99239,1.64028 14.16126,6.0828 l 2.23031,3.12671 0.5,108.500003 c 0.37603,81.59885 0.79665,109.01677 1.69648,110.58426 1.0719,1.86723 0.60028,2.67424 -4.52899,7.75 -3.14902,3.11616 -5.93744,5.6522 -6.19649,5.63566 -0.25905,-0.0165 -3.85939,-2.82905 -8.00075,-6.25 z"
                   />
              </g>
            </svg>
        )
    }
};
