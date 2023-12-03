"use client";
import { Accordion, Card } from 'flowbite-react'
import React from 'react'
import Image from 'next/image';
import { AdminDisableUser, AdminReviewControl } from '.';

const PrivacyPage = () => {
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Privacy
            </h1>
            <p>View Privacy Policies</p>
            <Card className="mt-5">
            <Accordion collapseAll>
                <Accordion.Panel>
                    <Accordion.Title>
                        Security and Privacy Policy
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                      HeroHub Security and Privacy Policy
                      1. Information Collected:

                      HeroHub collects user information for account creation and service personalization.
                      Information includes but is not limited to: name, email, and browsing behavior.
                      2. Data Security:

                      HeroHub employs industry-standard encryption to safeguard user data.
                      Strict access controls are in place, limiting data access to authorized personnel.
                      3. Information Sharing:

                      HeroHub does not sell or share user data with third parties without explicit consent.
                      Limited data may be shared with service providers for operational purposes.
                      4. Policy Updates:

                      HeroHub reserves the right to update this policy; users will be notified of any changes.
                      </p>
                    
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>
                      DMCA Notice & Takedown Policy
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                      HeroHub DMCA Notice & Takedown Policy
                      1. Reporting Infringements:

                      To report copyright infringements, please send a DMCA notice to [designated email].
                      2. Required Information:

                      Include detailed information about the alleged infringement.
                      Provide contact details for further communication.
                      3. Takedown Process:

                      Upon receipt of a valid DMCA notice, HeroHub will promptly investigate and take appropriate action.
                      Users may dispute takedown requests; a detailed dispute process is outlined in our policy.
                      4. Repeat Offenders:

                      HeroHub reserves the right to terminate accounts of repeat infringers.
                      </p>
                    
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>
                    Acceptable Use Policy (AUP)
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                      HeroHub Acceptable Use Policy (AUP)
                      1. Prohibited Content:

                      Users must not upload or share content that violates legal regulations or infringes on intellectual property rights.
                      2. User Conduct:

                      Respectful and ethical behavior is expected; harassment or abuse will not be tolerated.
                      3. Account Termination:

                      HeroHub may suspend or terminate accounts violating the AUP.
                      4. Reporting Violations:

                      Users are encouraged to report AUP violations for prompt investigation and action.
                      </p>
                    
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title>
                    Contact
                    </Accordion.Title>
                    <Accordion.Content>
                      <p>
                        For any notices of infringement please email mdigius@uwo.ca
                      </p>
                    
                    </Accordion.Content>
                  </Accordion.Panel>
            </Accordion>
            </Card>
      </div>
      <div className="hero__image-container mt-1">
                <div className="hero__image">
                    <Image src="/subzero.png" alt="hero"
                        fill className="object-contain mt-10"
                    />
                </div>
            </div>
    </div>
  )
}

export default PrivacyPage