import {useRouter} from "next/router";
import Link from "next/link";


export default function NavBar() {
    const router = useRouter();

    return (
        <nav>
            <div id="gnb" className="container-fluid gnb-option gnb-wrap gnb-shadow">
                <div className="gnb_area container">
                    <h1>
                        <Link href="/"><a><img src="/static/img/logo.png" alt="야나두키즈"/></a></Link>
                    </h1>
                    <ul className="gnb clearfix">
                        <li className="one-dep m1">
                            <a href="#!">
                                브랜드<em className="glyphicon glyphicon-menu-right"></em>
                            </a>
                            <ul className="two-dep">
                                <li><Link href="/brands/story"><a>브랜드 스토리</a></Link></li>
                                <li><Link href="/brands/nadoonadooFriends"><a>나두나두 친구들</a></Link>
                                </li>
                            </ul>
                        </li>
                        <li className="one-dep m2">
                            <a href="#!">서비스<em className="glyphicon glyphicon-menu-right"></em></a>
                            <ul className="two-dep">
                                <li><Link href="/service/yanadookids"><a>야나두키즈</a></Link></li>
                            </ul>
                        </li>
                        <li className="one-dep m3">
                            <a href="#!">
                                콘텐츠<span></span><em className="glyphicon glyphicon-menu-right"></em>
                            </a>
                            <ul className="two-dep">
                                <li>
                                    <Link href="/contents/yanadookidsContents"><a>야나두키즈 홈스쿨</a></Link></li>
                                <li>
                                    <Link href="/contents/helloChess"><a>Hello CHESS</a></Link>
                                </li>
                                <li>
                                    <Link href="/contents/hansol"><a>한솔교육</a></Link>
                                </li>
                                <li><Link href="/contents/daegyo"><a>대교 북클럽</a></Link></li>
                                <li><Link href="/contents/yanadoo"><a>야나두 주니어</a></Link></li>
                            </ul>
                        </li>
                        <li className="one-dep m4">
                            <a href="#!">
                                커머스<span></span><em className="glyphicon glyphicon-menu-right"></em></a>
                            <ul className="two-dep">
                                <li><Link href="/commerce/yanadookidsCoupon"><a>야나두키즈 이용권</a></Link></li>
                                <li className="logout"><Link href="/"><a>로그아웃</a></Link></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="mobile-gnb">
                        <li className="one-dep m1">
                            <a href="#!">브랜드<span></span><em className="glyphicon glyphicon-menu-right"></em></a>
                            <ul className="two-dep">
                                <li><Link href="/brands/story"><a>브랜드 스토리</a></Link></li>
                                <li><Link href="/brands/nadoonadooFriends"><a>나두나두 친구들</a></Link>
                                </li>
                            </ul>
                        </li>
                        <li className="one-dep m2">
                            <a href="#!">서비스<span></span><em className="glyphicon glyphicon-menu-right"></em></a>
                            <ul className="two-dep">
                                <li><Link href="/service/yanadookids"><a>야나두키즈</a></Link></li>
                            </ul>
                        </li>
                        <li className="one-dep m3">
                            <a href="#!">콘텐츠<span></span><em className="glyphicon glyphicon-menu-right"></em></a>
                            <ul className="two-dep">
                                <li><Link href="/contents/yanadookidsContents"><a>야나두키즈 홈스쿨</a></Link></li>
                                <li><Link href="/contents/helloChess"><a>Hello CHESS</a></Link>
                                </li>
                                <li><Link href="/contents/hansol"><a>한솔교육</a></Link></li>
                                <li><Link href="/contents/daegyo"><a>대교 북클럽</a></Link></li>
                                <li><Link href="/contents/yanadoo"><a>야나두 주니어</a></Link></li>
                            </ul>
                        </li>
                        <li className="one-dep m4">
                            <a href="#!">커머스<span></span><em className="glyphicon glyphicon-menu-right"></em></a>
                            <ul className="two-dep">
                                <li><Link href="/commerce/yanadookidsCoupon"><a>야나두키즈 이용권</a></Link></li>
                            </ul>
                        </li>
                        <li className="logout"><Link href="/"><a>로그아웃</a></Link></li>
                    </ul>

                    <div className="submit-area">
                        <button type="button" className="btn ex-btn" id="btn-login-modal">이용권 등록
                        </button>
                        <button type="button" className="btn ex-btn" id="btn-login-modal">이용권 등록
                        </button>
                    </div>
                </div>
                <div className="gnb-bg"></div>
            </div>
        </nav>
    );
}