using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainCamera : MonoBehaviour
{

	public float limit = 22.1f;
    public Transform player;
    public float timeLerp = 0.05f;

    private void FixedUpdate()
    {
        Vector3 newPosition = player.position + new Vector3(0, 0, -10);
        newPosition.y = 0.1f;
        newPosition = Vector3.Lerp(transform.position, newPosition, timeLerp);
        newPosition.x = Mathf.Clamp(newPosition.x, 0.1f, limit);

        transform.position = newPosition;
    }

}
