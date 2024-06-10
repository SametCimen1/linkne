import {useState}from 'react'
import Footer from '../components/Footer'

const Terms = () => {
  const [language, setLanguage] = useState("en")

  return (
    <div>
        <div className='container  mx-auto w-10/12 md:w-full '>
          <h1 className = "text-3xl text-center font-bold">{language==="tr" ? "Kullanım Şartları" : "Terms of Use"}</h1>
          
          <div className="tabs">
            <a className= {`tab tab-lifted ${language === "tr" ? "tab-active": ""}`} onClick = {() => setLanguage("tr")}>Turkish</a> 
            <a className={`tab tab-lifted ${language === "en" ? "tab-active": ""}`} onClick = {() => setLanguage("en")}>English</a> 
          </div>

          {language === 'en' ? 
            <div>
                <p>This website is operated by linkne. Throughout the site, the terms “we”, “us” and “our” refer to linkne. linkne offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
                <p className='mt-2'>By visiting our site and/or receiving payment from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.</p>
                <p className='mt-2'>Any new features or tools which are added to the current site shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                Our site is hosted on Digital Ocean. They provide us with the online server platform that allows us to provide our Services to you.</p>
                
                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 1 - SITE TERMS</h1>
                          <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
                          <p>
                          You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
                          <p>
                          You must not transmit any worms or viruses or rape material or child sexual abuse material or any code of a destructive nature.</p>
                          <p>
                          A breach or violation of any of the Terms will result in an immediate termination of your Services.</p>
                </div>
              

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 2 - GENERAL CONDITIONS</h1>
                          <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
                          <p>You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.</p>
                          <p>
                          You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</p>
                          <p>The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h1>
                          <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.
                          </p>
                          <p>
                          This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</p>
          
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 4 - MODIFICATIONS TO THE SERVICE AND PAYMENT</h1>
                          <p>CPM prices are subject to change without notice.</p>
                          <p>We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
                          <p>We shall not be liable to you or to any third-party for any modification, CPM price change, suspension or discontinuance of the Service.</p>
        
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 5 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h1>
                          <p>We reserve the right to refuse any payment request you place with us. We may, in our sole discretion, limit or cancel payment requested per person. These restrictions may include payments placed by or under the same customer account, the same credit card, and/or orders that use the same billing address. In the event that we make a change to or cancel a payment, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the payment request was made. </p>
                          <p>You agree to provide current, complete and accurate payment and account information for all purchases made at our site. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>  
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 6 - OPTIONAL TOOLS</h1>
                          <p>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</p>
                          <p>You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</p>
                          <p>Any use by you of the optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</p>
                          <p>We may also, in the future, offer new Services and/or features through the website (including, the release of new tools and resources). Such new features and/or Services shall also be subject to these Terms of Service.</p>  
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 7 - THIRD-PARTY LINKS</h1>
                          <p>Certain content, products and Services available via our Service may include materials from third-parties.</p>
                          <p>Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, contents, products, or Services of third-parties.</p>
                          <p>We are not liable for any harm or damages related to the purchase or use of goods, Services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 8 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h1>
                          <p>If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments.
                          We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service.</p>
                          <p>You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e-mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.</p>
                        
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 9 - PERSONAL INFORMATION</h1>
                          <p>Your submission of personal information through the site is governed by our Privacy Policy. To view our Privacy Policy, please see https://linkne.io/privacy</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 10 - ERRORS, INACCURACIES AND OMISSIONS</h1>
                          <p>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel payment if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your payment request).</p>
                          <p>We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, CPM pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 11 - PROHIBITED USES</h1>
                          <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
                          (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; (k) to upload child pornography, rape, racist content, or unlawful pornography; or (l) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 12 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h1>
                          <p>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.</p>
                          <p>We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</p>
                          <p>You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you.
                          You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and Services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind.</p>
                          <p>In no case shall linkne, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost savings, loss of data, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any services procured using the service, or for any other claim related in any way to your use of the service or any service, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility.
                          Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 13 - INDEMNIFICATION</h1>
                          <p>You agree to indemnify, defend and hold harmless linkne and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 14 - SEVERABILITY</h1>
                          <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 15 - TERMINATION</h1>
                          <p>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.</p>
                          <p>These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.
                          If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 16 - ENTIRE AGREEMENT</h1>
                          <p>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.</p>
                          <p>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).
                          Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 17 - GOVERNING LAW</h1>
                          <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Turkey.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 18 - CHANGES TO TERMS OF SERVICE</h1>
                          <p>You can review the most current version of the Terms of Service at any time at this page.</p>
                          <p>We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">SECTION 19 - CONTACT INFORMATION</h1>
                          <p>Questions about the Terms of Service should be sent to us at <a href = "mailto:support@linkne.io">support@linke.io</a></p>
                </div>
          </div>


        :

        <div>

                <p>Bu web sitesi linkne tarafından işletilmektedir. Site genelinde “biz”, “bize” ve “bizim” terimleri linkne'yi ifade etmektedir. linkne, bu siteden size, yani kullanıcıya sunulan tüm bilgiler, araçlar ve Hizmetler dahil olmak üzere bu web sitesini, burada belirtilen tüm şartları, koşulları, politikaları ve bildirimleri kabul etmeniz koşuluyla sunar.</p>
                <p className='mt-2'>Sitemizi ziyaret ederek ve/veya bizden ödeme alarak, "Hizmetimize" katılıyorsunuz ve bu ek şartlar ve koşullar ve politikalar dahil olmak üzere aşağıdaki şartlar ve koşullara ("Hizmet Şartları", "Şartlar") tabi olmayı kabul ediyorsunuz. burada atıfta bulunulan ve/veya hiper bağlantı ile sağlanan. Bu Hizmet Koşulları, tarayıcılar, satıcılar, müşteriler, satıcılar ve/veya içeriğe katkıda bulunanlar dahil ancak bunlarla sınırlı olmamak üzere sitenin tüm kullanıcıları için geçerlidir.
                 Web sitemize erişmeden veya web sitemizi kullanmadan önce lütfen bu Hizmet Koşullarını dikkatlice okuyun. Sitenin herhangi bir bölümüne erişerek veya bunları kullanarak, bu Hizmet Koşullarına tabi olmayı kabul edersiniz. Bu sözleşmenin tüm hüküm ve koşullarını kabul etmiyorsanız, web sitesine erişemez veya herhangi bir Hizmeti kullanamazsınız. Bu Hizmet Koşulları bir teklif olarak kabul edilirse, kabul açıkça bu Hizmet Koşullarıyla sınırlıdır.</p>
                <p className='mt-2'>Mevcut siteye eklenen herhangi bir yeni özellik veya araç da Hizmet Kullanım Koşullarına tabi olacaktır. Hizmet Şartlarının en güncel sürümünü istediğiniz zaman bu sayfada inceleyebilirsiniz. Web sitemizde güncellemeler ve/veya değişiklikler yayınlayarak bu Hizmet Koşullarının herhangi bir bölümünü güncelleme, değiştirme veya yenisiyle değiştirme hakkını saklı tutarız. Değişiklikler için bu sayfayı periyodik olarak kontrol etmek sizin sorumluluğunuzdadır. Herhangi bir değişikliğin yayınlanmasının ardından web sitesini kullanmaya veya erişmeye devam etmeniz, bu değişiklikleri kabul ettiğiniz anlamına gelir.
                 Sitemiz Digital Ocean üzerinde barındırılmaktadır. Hizmetlerimizi size sunmamızı sağlayan çevrimiçi sunucu platformunu bize sağlıyorlar.</p>
                
                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 1 - SİTE ŞARTLARI</h1>
                          <p>Bu Hizmet Şartlarını kabul ederek, ikamet ettiğiniz eyalet veya ilde en azından reşit yaşta olduğunuzu veya ikamet ettiğiniz eyalet veya ilde reşit olduğunuzu ve bize onay verdiğinizi beyan edersiniz. bakmakla yükümlü olduğunuz reşit olmayan kişilerin bu siteyi kullanmasına izin verin.</p>
                          <p>Hizmetimizi herhangi bir yasa dışı veya yetkisiz amaç için kullanamazsınız ve Hizmeti kullanırken yargı alanınızdaki herhangi bir yasayı (telif hakkı yasaları dahil ancak bunlarla sınırlı olmamak üzere) ihlal edemezsiniz.</p>
                          <p>Herhangi bir solucan veya virüs veya tecavüz materyali veya çocukların cinsel istismarı materyali veya yıkıcı nitelikte herhangi bir kod iletmemelisiniz.</p>
                          <p>Şartlardan herhangi birinin ihlali veya ihlal edilmesi, Hizmetlerinizin derhal feshedilmesiyle sonuçlanacaktır.</p>
                </div>
              

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 2 - GENEL ŞARTLAR</h1>
                          <p>Herhangi bir zamanda herhangi bir nedenle herhangi birine hizmet vermeyi reddetme hakkımızı saklı tutarız.</p>
                          <p>İçeriğinizin (kredi kartı bilgileri hariç) şifrelenmemiş olarak aktarılabileceğini ve (a) çeşitli ağlar üzerinden iletimler; ve (b) bağlantı ağları veya cihazlarının teknik gerekliliklerine uymak ve uyarlamak için yapılan değişiklikler. Kredi kartı bilgileri, ağlar üzerinden aktarım sırasında her zaman şifrelenir.</p>
                          <p>
                          Hizmetin herhangi bir bölümünü, Hizmetin kullanımını veya Hizmete erişimi veya hizmetin sağlandığı web sitesindeki herhangi bir kişiyi, bizim tarafımızdan açık yazılı izin olmaksızın çoğaltmayacağınızı, çoğaltmayacağınızı, kopyalamayacağınızı, satmayacağınızı, yeniden satmayacağınızı veya bunlardan yararlanmayacağınızı kabul edersiniz. .</p>
                          <p>Bu sözleşmede kullanılan başlıklar yalnızca kolaylık sağlamak amacıyla dahil edilmiştir ve bu Koşulları sınırlandırmaz veya başka şekilde etkilemez.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 3 - BİLGİLERİN DOĞRULUĞU, EKSİKLİĞİ VE ZAMANINDA OLMASI</h1>
                          <p>Bu sitede sunulan bilgilerin doğru, eksiksiz veya güncel olmamasından sorumlu değiliz. Bu sitedeki materyaller yalnızca genel bilgi amaçlıdır ve birincil, daha doğru, daha eksiksiz veya daha güncel bilgi kaynaklarına danışılmadan karar vermede tek dayanak olarak kullanılmamalı veya bunlara güvenilmemelidir. Bu sitedeki materyallere güvenme riski size aittir.
                          </p>
                          <p>
                          Bu site belirli tarihsel bilgiler içerebilir. Tarihsel bilgiler zorunlu olarak güncel değildir ve yalnızca referansınız için sağlanmıştır. Bu sitenin içeriğini istediğimiz zaman değiştirme hakkımız saklıdır, ancak sitemizdeki herhangi bir bilgiyi güncelleme yükümlülüğümüz yoktur. Sitemizdeki değişiklikleri izlemenin sizin sorumluluğunuzda olduğunu kabul etmektesiniz.</p>
          
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 4 - HİZMET VE ÖDEME DEĞİŞİKLİKLERİ</h1>
                          <p>CPM fiyatları haber verilmeksizin değiştirilebilir.</p>
                          <p>Hizmeti (veya herhangi bir bölümünü veya içeriğini) önceden bildirimde bulunmaksızın herhangi bir zamanda değiştirme veya durdurma hakkını saklı tutarız.</p>
                          <p>Hizmetin herhangi bir değişikliği, BGBM fiyat değişikliği, askıya alınması veya durdurulmasından dolayı size veya herhangi bir üçüncü tarafa karşı yükümlü olmayacağız.</p>
        
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 5 - FATURA VE HESAP BİLGİLERİNİN DOĞRULUĞU</h1>
                          <p>Bize ilettiğiniz herhangi bir ödeme talebini reddetme hakkımız saklıdır. Kendi takdirimize bağlı olarak, kişi başına talep edilen ödemeyi sınırlayabilir veya iptal edebiliriz. Bu kısıtlamalar, aynı müşteri hesabı tarafından veya altında yapılan ödemeleri, aynı kredi kartını ve/veya aynı fatura adresini kullanan siparişleri içerebilir. Bir ödemede değişiklik yapmamız veya ödemeyi iptal etmemiz durumunda, ödeme talebinin yapıldığı sırada verilen e-posta ve/veya fatura adresi/telefon numarası ile iletişime geçerek sizi bilgilendirmeye çalışabiliriz. </p>
                          <p>Sitemizden yaptığınız tüm satın alma işlemleri için güncel, eksiksiz ve doğru ödeme ve hesap bilgilerini vermeyi kabul etmektesiniz. İşlemlerinizi tamamlayabilmemiz ve gerektiğinde sizinle iletişim kurabilmemiz için e-posta adresiniz ve kredi kartı numaralarınız ve son kullanma tarihleri dahil olmak üzere hesabınızı ve diğer bilgileri derhal güncellemeyi kabul ediyorsunuz.</p>  
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 6 - İSTEĞE BAĞLI ARAÇLAR</h1>
                          <p>İzlemediğimiz, üzerinde herhangi bir kontrolümüz veya girdimiz olmayan üçüncü taraf araçlara erişim sağlayabiliriz.</p>
                          <p>Bu tür araçlara "olduğu gibi" ve "mümkün olduğu gibi" herhangi bir garanti, beyan veya koşul ve herhangi bir onay olmaksızın erişim sağladığımızı onaylar ve kabul edersiniz. İsteğe bağlı üçüncü taraf araçlarını kullanımınızdan kaynaklanan veya bunlarla ilgili hiçbir sorumluluğumuz olmayacaktır.</p>
                          <p>Site aracılığıyla sunulan isteğe bağlı araçları herhangi bir şekilde kullanmanız tamamen kendi sorumluluğunuzdadır ve kendi takdirinize bağlıdır ve ilgili üçüncü taraf sağlayıcı(lar) tarafından sağlanan araçlara ilişkin şartları bildiğinizden ve onayladığınızdan emin olmalısınız.</p>
                          <p>Ayrıca gelecekte web sitesi aracılığıyla yeni Hizmetler ve/veya özellikler sunabiliriz (yeni araçların ve kaynakların piyasaya sürülmesi dahil). Bu tür yeni özellikler ve/veya Hizmetler de bu Hizmet Koşullarına tabi olacaktır.</p>  
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 7 - ÜÇÜNCÜ TARAF BAĞLANTILARI</h1>
                          <p>Hizmetimiz aracılığıyla sunulan belirli içerik, ürün ve Hizmetler, üçüncü taraflardan alınan materyalleri içerebilir.</p>
                          <p>Bu sitedeki üçüncü taraf bağlantıları, sizi bizimle bağlantısı olmayan üçüncü taraf web sitelerine yönlendirebilir. İçeriğin veya doğruluğunun incelenmesinden veya değerlendirilmesinden sorumlu değiliz ve herhangi bir üçüncü şahıs materyali veya web sitesi veya üçüncü şahısların diğer materyalleri, içerikleri, ürünleri veya Hizmetleri için herhangi bir garanti vermiyoruz ve bunlara ilişkin herhangi bir yükümlülük veya sorumluluğumuz olmayacak. .</p>
                          <p>Malların, Hizmetlerin, kaynakların, içeriğin satın alınması veya kullanılması veya herhangi bir üçüncü taraf web sitesiyle bağlantılı olarak yapılan diğer işlemlerle ilgili herhangi bir zarar veya hasardan sorumlu değiliz. Lütfen üçüncü tarafın politikalarını ve uygulamalarını dikkatlice inceleyin ve herhangi bir işleme girmeden önce bunları anladığınızdan emin olun. Üçüncü taraf ürünleriyle ilgili şikayetler, iddialar, endişeler veya sorular üçüncü tarafa yönlendirilmelidir.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 8 - KULLANICI YORUMLARI, GERİ BİLDİRİM VE DİĞER GÖNDERİMLER</h1>
                          <p>Bizim isteğimiz üzerine, belirli belirli gönderimler (örneğin, yarışma girişleri) gönderirseniz veya bizim talebimiz olmadan çevrimiçi, e-posta, posta yoluyla veya başka bir şekilde yaratıcı fikirler, öneriler, teklifler, planlar veya diğer materyaller gönderirseniz (toplu olarak 'yorumlar'), bize ilettiğiniz yorumları herhangi bir zamanda herhangi bir kısıtlama olmaksızın düzenleyebileceğimizi, kopyalayabileceğimizi, yayınlayabileceğimizi, dağıtabileceğimizi, tercüme edebileceğimizi ve herhangi bir ortamda kullanabileceğimizi kabul ediyorsunuz. (1) herhangi bir yorumu gizli tutmakla yükümlü değiliz ve olmayacağız; (2) herhangi bir yorum için tazminat ödemek; veya (3) herhangi bir yoruma yanıt vermek.
                           Kendi takdirimize bağlı olarak yasa dışı, saldırgan, tehdit edici, iftira niteliğinde, iftira niteliğinde, pornografik, müstehcen veya başka bir şekilde sakıncalı olduğunu veya herhangi bir tarafın fikri mülkiyetini veya bu Kullanım Koşullarını ihlal ettiğini belirlediğimiz içeriği izleyebilir, düzenleyebilir veya kaldırabiliriz, ancak böyle bir yükümlülüğümüz yoktur.</p>
                          <p>Yorumlarınızın herhangi bir üçüncü şahsın telif hakkı, ticari marka, mahremiyet, kişilik veya diğer kişisel veya mülkiyet hakları dahil hiçbir hakkını ihlal etmeyeceğini kabul etmektesiniz. Ayrıca, yorumlarınızın iftira niteliğinde veya başka bir şekilde yasa dışı, küfürlü veya müstehcen materyal içermeyeceğini veya Hizmetin veya ilgili herhangi bir web sitesinin işleyişini herhangi bir şekilde etkileyebilecek herhangi bir bilgisayar virüsü veya başka kötü amaçlı yazılım içermeyeceğini kabul edersiniz. Yanlış bir e-posta adresi kullanamaz, kendinizden başka biri gibi davranamaz veya herhangi bir yorumun kaynağı konusunda bizi veya üçüncü tarafları yanıltamazsınız. Yaptığınız yorumlardan ve bunların doğruluğundan yalnızca siz sorumlusunuz. Siz veya herhangi bir üçüncü şahıs tarafından gönderilen herhangi bir yorum için hiçbir sorumluluk kabul etmiyoruz ve hiçbir yükümlülük kabul etmiyoruz.</p>
                        
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 9 - KİŞİSEL BİLGİLER</h1>
                          <p>Site aracılığıyla kişisel bilgilerinizi göndermeniz, Gizlilik Politikamıza tabidir. Gizlilik Politikamızı görüntülemek için lütfen https://linkne.io/privacy adresine bakın.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 10 - HATALAR, YANLIŞLAR VE EKSİKLER</h1>
                          <p>Bazen sitemizde veya Hizmette tipografik hatalar, yanlışlıklar veya eksiklikler içeren bilgiler olabilir. Hizmetteki veya herhangi bir ilgili web sitesindeki herhangi bir bilginin yanlış olması durumunda herhangi bir zamanda önceden bildirimde bulunmaksızın (ödeme talebinizi gönderdikten sonra dahil olmak üzere) herhangi bir hatayı, yanlışlığı veya eksikliği düzeltme ve bilgileri değiştirme veya güncelleme veya ödemeyi iptal etme hakkını saklı tutarız. ).</p>
                          <p>Yasaların gerektirdiği durumlar dışında, CPM fiyatlandırma bilgileri dahil ancak bunlarla sınırlı olmamak üzere, Hizmetteki veya ilgili herhangi bir web sitesindeki bilgileri güncelleme, değiştirme veya açıklığa kavuşturma yükümlülüğü üstlenmiyoruz. Hizmette veya ilgili herhangi bir web sitesinde uygulanan hiçbir güncelleme veya yenileme tarihi, Hizmetteki veya herhangi bir ilgili web sitesindeki tüm bilgilerin değiştirildiğini veya güncellendiğini belirtmek için alınmamalıdır.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 11 - YASAKLANAN KULLANIMLAR</h1>
                          <p>Hizmet Koşullarında belirtilen diğer yasaklara ek olarak, siteyi veya içeriğini kullanmanız yasaktır:
                          (a) yasa dışı herhangi bir amaç için; (b) başkalarını herhangi bir yasa dışı eylemi gerçekleştirmeye veya bu eylemlere katılmaya teşvik etmek; (c) herhangi bir uluslararası, federal, eyalet veya eyalet düzenlemelerini, kurallarını, yasalarını veya yerel yönetmeliklerini ihlal etmek; (d) fikri mülkiyet haklarımızı veya başkalarının fikri mülkiyet haklarını ihlal etmek veya ihlal etmek; (e) cinsiyet, cinsel yönelim, din, etnik köken, ırk, yaş, ulusal köken veya engelliliğe dayalı olarak taciz etmek, suistimal etmek, hakaret etmek, zarar vermek, karalamak, iftira atmak, aşağılamak, korkutmak veya ayrımcılık yapmak; (f) yanlış veya yanıltıcı bilgi vermek; (g) Hizmetin veya herhangi bir ilgili web sitesinin, diğer web sitelerinin veya İnternetin işlevselliğini veya işleyişini etkileyecek herhangi bir şekilde kullanılabilecek veya kullanılabilecek virüsleri veya diğer türde kötü amaçlı kodları yüklemek veya iletmek; (h) başkalarının kişisel bilgilerini toplamak veya izlemek; (i) spam, kimlik avı, pharm, bahane, örümcek, tarama veya kazıma; (j) herhangi bir müstehcen veya ahlak dışı amaç için; (k) çocuk pornografisi, tecavüz, ırkçı içerik veya yasa dışı pornografi yüklemek; veya (l) Hizmetin veya ilgili herhangi bir web sitesinin, diğer web sitelerinin veya İnternetin güvenlik özelliklerine müdahale etmek veya bunları atlatmak. Yasaklanan kullanımlardan herhangi birini ihlal ettiğiniz için Hizmeti veya ilgili herhangi bir web sitesini kullanımınızı sonlandırma hakkını saklı tutarız.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 12 - GARANTİLERİN REDDİ; SORUMLULUĞUN SINIRLANDIRILMASI</h1>
                          <p>Hizmetimizi kullanımınızın kesintisiz, zamanında, güvenli veya hatasız olacağını garanti etmiyoruz, beyan veya garanti etmiyoruz.</p>
                          <p>Hizmetin kullanımından elde edilebilecek sonuçların doğru veya güvenilir olacağını garanti etmiyoruz.</p>
                          <p>Zaman zaman hizmeti süresiz olarak kaldırabileceğimizi veya hizmeti herhangi bir zamanda, size bildirimde bulunmaksızın iptal edebileceğimizi kabul etmektesiniz.
                          Hizmeti kullanımınızın veya kullanamamanızın riskinin tamamen size ait olduğunu açıkça kabul edersiniz. Hizmet aracılığıyla size teslim edilen Hizmet ve Hizmetler (bizim tarafımızdan açıkça belirtilmedikçe), herhangi bir beyan, garanti veya koşul olmaksızın 'olduğu gibi' ve 'mevcut olduğu şekilde' sağlanır.</p>
                          <p>Linkne, yöneticilerimiz, memurlarımız, çalışanlarımız, iştiraklerimiz, aracılarımız, yüklenicilerimiz, stajyerlerimiz, tedarikçilerimiz, hizmet sağlayıcılarımız veya lisans verenlerimiz hiçbir durumda herhangi bir yaralanma, kayıp, iddia veya herhangi bir doğrudan, dolaylı, arızi, cezai, özel veya herhangi bir hizmeti kullanımınızdan kaynaklanan, sözleşme, haksız fiil (ihmal dahil), kusursuz sorumluluk veya başka bir şeye dayalı olsun, ancak bunlarla sınırlı olmamak üzere kar kaybı, tasarruf kaybı, veri kaybı veya benzer zararlar dahil olmak üzere her türden dolaylı zararlar veya hizmet kullanılarak sağlanan herhangi bir hizmet veya herhangi bir şekilde, herhangi bir içerikteki herhangi bir hata veya eksiklik veya herhangi bir kayıp veya hasar dahil ancak bunlarla sınırlı olmamak üzere, hizmeti veya herhangi bir hizmeti kullanımınızla ilgili diğer herhangi bir iddia için hizmetin veya hizmet aracılığıyla gönderilen, iletilen veya başka bir şekilde kullanıma sunulan herhangi bir içeriğin (veya ürünün) kullanılması sonucunda ortaya çıkan, olasılıkları bildirilmiş olsa bile.
                          Bazı eyaletler veya yargı bölgeleri, dolaylı veya arızi zararlar için sorumluluğun hariç tutulmasına veya sınırlandırılmasına izin vermediğinden, bu tür eyaletlerde veya yargı bölgelerinde, sorumluluğumuz yasaların izin verdiği azami ölçüde sınırlandırılacaktır.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 13 - TAZMİNAT</h1>
                          <p>Linkne'i ve ana şirketimizi, iştiraklerimizi, iştiraklerimizi, ortaklarımızı, memurlarımızı, müdürlerimizi, aracılarımızı, yüklenicilerimizi, lisans verenlerimizi, hizmet sağlayıcılarımızı, taşeronlarımızı, tedarikçilerimizi, stajyerlerimizi ve çalışanlarımızı makul olanlar da dahil olmak üzere herhangi bir iddia veya talep karşısında tazmin etmeyi, savunmayı ve zarar görmemesini sağlamayı kabul ediyorsunuz. Bu Hizmet Koşullarını veya referans olarak içerdikleri belgeleri ihlal etmenizden veya herhangi bir yasayı veya bir üçüncü tarafın haklarını ihlal etmeniz nedeniyle veya bunlardan kaynaklanan herhangi bir üçüncü tarafça yapılan avukatlık ücretleri.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 14 - BÖLÜNEBİLİRLİK</h1>
                          <p>Bu Hizmet Koşullarının herhangi bir hükmünün yasa dışı, geçersiz veya uygulanamaz olduğunun belirlenmesi durumunda, söz konusu hüküm yine de yürürlükteki yasaların izin verdiği ölçüde uygulanabilir olacak ve uygulanamayan kısım bu Kullanım Koşullarından ayrılmış kabul edilecektir. Hizmet, bu tür bir tespit, kalan diğer hükümlerin geçerliliğini ve uygulanabilirliğini etkilemeyecektir.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 15 - SONLANDIRMA</h1>
                          <p>Tarafların fesih tarihinden önce ortaya çıkan yükümlülükleri ve yükümlülükleri, bu sözleşmenin tüm amaçlar için feshedilmesinden sonra da geçerliliğini koruyacaktır.</p>
                          <p>Bu Hizmet Koşulları, siz veya bizim tarafımızdan feshedilmedikçe ve feshedilmedikçe geçerlidir. Artık Hizmetlerimizi kullanmak istemediğinizi bize bildirerek veya sitemizi kullanmayı bıraktığınızda bu Hizmet Koşullarını istediğiniz zaman feshedebilirsiniz.
                          Bu Hizmet Şartlarının herhangi bir şartına veya hükmüne uymadığınıza dair yegâne yargımız bize kalırsa veya uymadığınızdan şüphelenirsek, bu sözleşmeyi herhangi bir zamanda bildirimde bulunmaksızın feshedebiliriz ve ödenmesi gereken tüm meblağlardan siz sorumlu olmaya devam edersiniz. fesih tarihi dahil olmak üzere; ve/veya buna göre Hizmetlerimize (veya herhangi bir bölümüne) erişiminizi reddedebilir.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 16 - SÖZLEŞMENİN TÜMÜ</h1>
                          <p>Bu Hizmet Koşullarının herhangi bir hakkını veya hükmünü uygulamamamız veya uygulamamamız, söz konusu hak veya hükümden feragat edildiği anlamına gelmez.</p>
                          <p>Bu Hizmet Koşulları ve tarafımızca bu sitede veya Hizmetle ilgili olarak yayınlanan tüm politikalar veya çalıştırma kuralları, sizinle bizim aramızdaki tüm anlaşmayı ve mutabakatı oluşturur ve önceki veya eşzamanlı sözleşmelerin, iletişimlerin ve tekliflerin yerine geçerek Hizmeti kullanımınızı yönetir. , sözlü veya yazılı, sizinle bizim aramızda (Hizmet Koşullarının önceki sürümleri dahil ancak bunlarla sınırlı olmamak üzere).
                          Bu Hizmet Koşullarının yorumlanmasındaki herhangi bir belirsizlik, taslağı hazırlayan tarafa karşı yorumlanmayacaktır.</p>
                </div>


                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 17 - UYGULANACAK HUKUK</h1>
                          <p>Bu Hizmet Koşulları ve size Hizmet sağladığımız her türlü ayrı sözleşme, Türkiye yasalarına tabi olacak ve bu yasalara göre yorumlanacaktır.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 18 - HİZMET ŞARTLARINDA DEĞİŞİKLİKLER</h1>
                          <p>Hizmet Şartlarının en güncel sürümünü istediğiniz zaman bu sayfada inceleyebilirsiniz.</p>
                          <p>Tamamen kendi takdirimize bağlı olarak, web sitemizde güncellemeler ve değişiklikler yayınlayarak bu Hizmet Koşullarının herhangi bir bölümünü güncelleme, değiştirme veya yenisiyle değiştirme hakkını saklı tutuyoruz. Değişiklikler için web sitemizi periyodik olarak kontrol etmek sizin sorumluluğunuzdadır. Bu Hizmet Koşullarında herhangi bir değişikliğin yayınlanmasının ardından web sitemizi veya Hizmeti kullanmaya veya bunlara erişmeye devam etmeniz, bu değişiklikleri kabul ettiğiniz anlamına gelir.</p>
                </div>

                <div className = "mt-4">
                          <h1 className = "text-xl font-semibold">BÖLÜM 19 - İLETİŞİM BİLGİLERİ</h1>
                          <p>Hizmet Şartları ile ilgili sorular bize <a href = "mailto:support@linkne.io">support@linke.io</a> adresinden gönderilmelidir.</p>
                </div>


        </div>


        }

          


        </div>

        <Footer></Footer>
    </div>
  )
}

export default Terms
