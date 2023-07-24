import React, { useEffect, useRef, useState } from 'react';

export const Sample: React.FC = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInViewport(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (isInViewport) {
        event.preventDefault();
      }
    };

    if (isInViewport) {
      window.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInViewport]);

  return (
    <div
      ref={componentRef}
      style={{
        height: '300px',
        width: '300px',
        overflow: isInViewport ? 'auto' : 'hidden',
        border: '1px solid #ccc',
      }}
    >
      <div style={{ height: '600px', width: '600px', backgroundColor: '#f0f0f0' }}>
        {isInViewport ? 'Scroll inside this component' : 'Scroll to see the component'}
      </div>
    </div>
  );
};



// import React, { useEffect, useRef, useState } from 'react';

// interface Step {
//   id: number;
//   content: string;
// }

// export const Sample: React.FC = () => {
//   const [steps, setSteps] = useState<Step[]>([
//     { id: 1, content: 'Step 1: This is the first step.' },
//     { id: 2, content: 'Step 2: This is the second step.' },
//     { id: 3, content: 'Step 3: This is the third step.' },
//     // Add more steps as needed
//   ]);

//   const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [activeStep, setActiveStep] = useState<number>(1);

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: '0px',
//       threshold: 0.5,
//     };

//     const handleIntersection = (entries: IntersectionObserverEntry[]) => {
//       entries.forEach((entry) => {
//         const stepId = Number(entry.target.getAttribute('data-step-id'));
//         if (entry.isIntersecting && activeStep !== stepId) {
//           setActiveStep(stepId);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);

//     stepRefs.current.forEach((stepRef) => {
//       if (stepRef) {
//         observer.observe(stepRef);
//       }
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [activeStep]);

//   return (
//     <div>
//       {steps.map((step) => (
//         <div
//           key={step.id}
//           ref={(el) => (stepRefs.current[step.id] = el)}
//           data-step-id={step.id}
//           style={{ display: activeStep === step.id ? 'block' : 'none' }}
//         >
//           <h2>Step {step.id}</h2>
//           <p>{step.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

